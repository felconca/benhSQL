const express = require("express");
const db = require("../db");
const { encrypt, decrypt } = require("../crypto");
const aiProviderManager = require("../aiProviderManager");

const router = express.Router();
const VALID_PROVIDERS = ["anthropic", "openai", "xai", "custom"];

// GET /api/ai-providers — never returns the actual key; base_url is plain
// (not a secret) so it's returned as-is for the settings form to show.
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT provider, base_url, updated_at FROM ai_providers").all();
  const byProvider = new Map(rows.map((r) => [r.provider, r]));
  res.json(
    VALID_PROVIDERS.map((provider) => ({
      provider,
      configured: byProvider.has(provider),
      baseUrl: byProvider.get(provider)?.base_url || null,
      updatedAt: byProvider.get(provider)?.updated_at || null,
    })),
  );
});

// PUT /api/ai-providers/:provider  { apiKey, baseUrl? }
// baseUrl is required for 'custom' and ignored for the fixed cloud providers.
// apiKey is required for the fixed providers, optional for 'custom' (many
// local servers like Ollama don't check it at all).
router.put("/:provider", (req, res) => {
  const { provider } = req.params;
  if (!VALID_PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: `Unknown provider "${provider}".` });
  }

  const apiKey = (req.body.apiKey || "").trim();
  const baseUrl = (req.body.baseUrl || "").trim();

  if (provider === "custom") {
    if (!baseUrl) return res.status(400).json({ error: "Base URL is required for a custom endpoint." });
    try {
      new URL(baseUrl);
    } catch (err) {
      return res.status(400).json({ error: "That base URL doesn't look valid." });
    }
  } else if (!apiKey) {
    return res.status(400).json({ error: "API key is required." });
  }

  let encrypted;
  try {
    // A custom endpoint often needs no key at all — store a harmless
    // placeholder rather than relaxing the NOT NULL column for one case.
    encrypted = encrypt(apiKey || "not-needed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  db.prepare(
    `
    INSERT INTO ai_providers (provider, api_key_encrypted, base_url, updated_at)
    VALUES (@provider, @key, @baseUrl, datetime('now'))
    ON CONFLICT(provider) DO UPDATE SET api_key_encrypted = @key, base_url = @baseUrl, updated_at = datetime('now')
  `,
  ).run({ provider, key: encrypted, baseUrl: provider === "custom" ? baseUrl : null });

  res.json({ ok: true });
});

// DELETE /api/ai-providers/:provider
router.delete("/:provider", (req, res) => {
  const { provider } = req.params;
  if (!VALID_PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: `Unknown provider "${provider}".` });
  }
  db.prepare("DELETE FROM ai_providers WHERE provider = ?").run(provider);
  res.json({ ok: true });
});

// GET /api/ai-providers/custom/models — lists what's actually available on
// the configured custom endpoint, for the chat model dropdown.
router.get("/custom/models", async (req, res) => {
  const row = db.prepare("SELECT * FROM ai_providers WHERE provider = 'custom'").get();
  if (!row) return res.status(400).json({ error: "No custom endpoint configured yet." });
  try {
    const apiKey = decrypt(row.api_key_encrypted);
    const models = await aiProviderManager.listCustomEndpointModels(row.base_url, apiKey);
    res.json(models);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
