// Maps the friendly model names shown in the dropdown to the provider that
// serves them. "local:<id>" models are handled separately (see chatLocal).
const MODEL_PROVIDER = {
  "claude-sonnet": "anthropic",
  "claude-opus": "anthropic",
  "claude-haiku": "anthropic",
  "gpt-4o": "openai",
  "gpt-4o-mini": "openai",
  grok: "xai",
};

// Real API model identifiers. The Anthropic ones are current as of this
// writing; OpenAI/xAI are reasonable defaults but you should double check
// they match what your API key has access to and swap them if not.
const ANTHROPIC_MODEL_IDS = {
  "claude-sonnet": "claude-sonnet-5",
  "claude-opus": "claude-opus-5",
  "claude-haiku": "claude-haiku-4-5-20251001",
};
const OPENAI_MODEL_IDS = {
  "gpt-4o": "gpt-4o",
  "gpt-4o-mini": "gpt-4o-mini",
};
const XAI_MODEL_IDS = {
  grok: "grok-beta",
};

async function chatAnthropic(apiKey, model, messages) {
  const modelId = ANTHROPIC_MODEL_IDS[model] || model;
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");
  const chatMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 1024,
      ...(system ? { system } : {}),
      messages: chatMessages,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `Anthropic API error (${res.status})`);
  }
  const textBlock = (data.content || []).find((b) => b.type === "text");
  return textBlock ? textBlock.text : "";
}

async function chatOpenAI(apiKey, model, messages, baseUrl) {
  const modelId = OPENAI_MODEL_IDS[model] || model;
  const res = await fetch(`${baseUrl || "https://api.openai.com/v1"}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: modelId, messages }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `OpenAI API error (${res.status})`);
  }
  return data.choices?.[0]?.message?.content || "";
}

async function chatXai(apiKey, model, messages) {
  const modelId = XAI_MODEL_IDS[model] || model;
  // xAI's API is OpenAI-compatible.
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: modelId, messages }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `xAI API error (${res.status})`);
  }
  return data.choices?.[0]?.message?.content || "";
}

async function chatCustomEndpoint(baseUrl, apiKey, model, messages) {
  // Ollama, LM Studio, vLLM, and most other local inference servers all
  // speak the same OpenAI-compatible /chat/completions shape, so this is
  // chatOpenAI pointed at a user-supplied URL rather than a separate
  // implementation. The model id is used as-is — there's no fixed mapping
  // like the cloud providers have, since it's whatever the user's own
  // server calls it (e.g. "llama3.1:8b").
  return chatOpenAI(apiKey || "not-needed", model, messages, baseUrl);
}

// For populating the model dropdown: most OpenAI-compatible servers expose
// GET /models returning { data: [{ id, ... }, ...] }, same as OpenAI's own
// models list endpoint.
async function listCustomEndpointModels(baseUrl, apiKey) {
  const res = await fetch(`${baseUrl}/models`, {
    headers: { Authorization: `Bearer ${apiKey || "not-needed"}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `Could not list models (${res.status})`);
  }
  return (data.data || []).map((m) => m.id).filter(Boolean);
}

async function chatCloud(provider, apiKey, model, messages, baseUrl) {
  if (provider === "anthropic") return chatAnthropic(apiKey, model, messages);
  if (provider === "openai") return chatOpenAI(apiKey, model, messages);
  if (provider === "xai") return chatXai(apiKey, model, messages);
  if (provider === "custom") return chatCustomEndpoint(baseUrl, apiKey, model, messages);
  throw new Error(`Unsupported provider "${provider}".`);
}

// Loaded local models are kept in memory (keyed by model id) so repeated
// messages in the same conversation don't reload multi-GB files from disk
// each time. LlamaChatSession tracks its own conversation state internally,
// so we only need to pass it the latest user turn.
const localSessions = new Map();

async function getLocalSession(modelPath, modelId) {
  if (localSessions.has(modelId)) return localSessions.get(modelId);

  // node-llama-cpp is ESM-only; this project is CommonJS, so it has to be
  // brought in with a dynamic import rather than require().
  const { getLlama, LlamaChatSession } = await import("node-llama-cpp");
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath });
  const context = await model.createContext();
  const session = new LlamaChatSession({ contextSequence: context.getSequence() });

  const entry = { session };
  localSessions.set(modelId, entry);
  return entry;
}

async function chatLocal(modelPath, modelId, messages) {
  const { session } = await getLocalSession(modelPath, modelId);
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) throw new Error("No user message to respond to.");

  // LlamaChatSession has no per-call "system message" concept like the
  // cloud chat APIs do — it just keeps a running conversation. So instead
  // of dropping the system message (which is where the live query editor
  // context lives), fold it into the prompt text itself. This is rebuilt
  // fresh by the frontend on every turn, so the model always sees whatever
  // is currently in the editor, not just what it was when the chat started.
  const systemParts = messages.filter((m) => m.role === "system").map((m) => m.content);
  const prompt = systemParts.length
    ? `${systemParts.join("\n\n")}\n\n---\n\nUser question: ${lastUser.content}`
    : lastUser.content;

  return session.prompt(prompt);
}

// Drops a cached session (e.g. after a model file is deleted) so a stale
// handle to a now-missing file isn't reused.
function forgetLocalSession(modelId) {
  localSessions.delete(modelId);
}

module.exports = { MODEL_PROVIDER, chatCloud, chatLocal, forgetLocalSession, listCustomEndpointModels };
