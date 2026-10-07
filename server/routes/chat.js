const express = require("express");
const db = require("../db");
const { decrypt } = require("../crypto");
const aiProviderManager = require("../aiProviderManager");

const router = express.Router();

// POST /api/chat  { model, messages: [{role, content}] }
router.post("/", async (req, res) => {
  const { model, messages } = req.body;

  if (!model) return res.status(400).json({ error: "No model specified." });
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided." });
  }

  try {
    if (model.startsWith("local:")) {
      const id = model.slice("local:".length);
      const row = db.prepare("SELECT * FROM local_models WHERE id = ?").get(id);
      if (!row) {
        return res.status(404).json({ error: "That local model no longer exists — pick another from the dropdown." });
      }
      const reply = await aiProviderManager.chatLocal(row.file_path, row.id, messages);
      return res.json({ reply });
    }

    if (model.startsWith("custom:")) {
      const modelId = model.slice("custom:".length);
      const providerRow = db.prepare("SELECT * FROM ai_providers WHERE provider = 'custom'").get();
      if (!providerRow) {
        return res.status(400).json({
          error: "No custom endpoint configured. Add one in the chat settings (gear icon) first.",
        });
      }
      const apiKey = decrypt(providerRow.api_key_encrypted);
      const reply = await aiProviderManager.chatCloud("custom", apiKey, modelId, messages, providerRow.base_url);
      return res.json({ reply });
    }

    const provider = aiProviderManager.MODEL_PROVIDER[model];
    if (!provider) return res.status(400).json({ error: `Unknown model "${model}".` });

    const providerRow = db.prepare("SELECT * FROM ai_providers WHERE provider = ?").get(provider);
    if (!providerRow) {
      return res.status(400).json({
        error: `No API key configured for ${provider}. Add one in the chat settings (gear icon) first.`,
      });
    }

    const apiKey = decrypt(providerRow.api_key_encrypted);
    const reply = await aiProviderManager.chatCloud(provider, apiKey, model, messages);
    res.json({ reply });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
