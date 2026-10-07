const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const db = require("../db");
const aiProviderManager = require("../aiProviderManager");

const router = express.Router();

// Model files (e.g. .gguf for node-llama-cpp) can be many GB — stream
// straight to disk rather than buffering in memory.
const MODELS_DIR = path.resolve(process.cwd(), process.env.MODELS_DIR || "./data/models");
fs.mkdirSync(MODELS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, MODELS_DIR),
  filename: (req, file, cb) => {
    // Random prefix avoids collisions between models with the same filename;
    // original extension is kept so tooling that inspects the file still works.
    const prefix = crypto.randomBytes(4).toString("hex");
    const ext = path.extname(file.originalname) || ".gguf";
    cb(null, `${prefix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 64 * 1024 * 1024 * 1024 }, // 64GB ceiling — generous for local GGUF models
});

function toPublic(row) {
  return {
    id: row.id,
    name: row.name,
    filename: row.filename,
    sizeBytes: row.size_bytes,
    createdAt: row.created_at,
  };
}

// GET /api/models — list uploaded local models
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM local_models ORDER BY created_at ASC").all();
  res.json(rows.map(toPublic));
});

// POST /api/models — upload a new model file (multipart/form-data, field "model")
router.post("/", (req, res) => {
  upload.single("model")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: `Upload failed: ${err.message}` });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No file uploaded. Send it as multipart/form-data under the "model" field.' });
    }

    const name = (req.body.name && req.body.name.trim()) || req.file.originalname.replace(/\.[^.]+$/, "");
    const row = {
      id: crypto.randomUUID(),
      name,
      filename: req.file.originalname,
      file_path: req.file.path,
      size_bytes: req.file.size,
    };

    try {
      db.prepare(
        `
        INSERT INTO local_models (id, name, filename, file_path, size_bytes)
        VALUES (@id, @name, @filename, @file_path, @size_bytes)
      `,
      ).run(row);
    } catch (dbErr) {
      fs.unlink(req.file.path, () => {}); // clean up the orphaned file
      return res.status(500).json({ error: dbErr.message });
    }

    res.status(201).json(toPublic({ ...row, created_at: new Date().toISOString() }));
  });
});

// DELETE /api/models/:id — remove a model file and its record
router.delete("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM local_models WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: `No model with id "${req.params.id}"` });
  fs.unlink(row.file_path, () => {}); // file may already be gone — not fatal either way
  db.prepare("DELETE FROM local_models WHERE id = ?").run(req.params.id);
  aiProviderManager.forgetLocalSession(row.id);
  res.json({ ok: true });
});

module.exports = router;
