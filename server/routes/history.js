const express = require('express');
const db = require('../db');

const router = express.Router();

function toPublic(row) {
  return {
    id: row.id,
    connectionId: row.connection_id,
    connectionName: row.connection_name,
    connectionType: row.connection_type,
    databaseName: row.database_name,
    query: row.query_text,
    status: row.status,
    errorMessage: row.error_message,
    rowCount: row.row_count,
    ms: row.duration_ms,
    createdAt: row.created_at,
  };
}

// GET /api/history?limit=200
router.get('/', (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 200, 1000);
  const rows = db.prepare('SELECT * FROM history ORDER BY created_at DESC, rowid DESC LIMIT ?').all(limit);
  res.json(rows.map(toPublic));
});

// DELETE /api/history — clear all history
router.delete('/', (req, res) => {
  db.prepare('DELETE FROM history').run();
  res.json({ ok: true });
});

// DELETE /api/history/:id — remove a single entry
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM history WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: `No history entry with id "${req.params.id}"` });
  }
  res.json({ ok: true });
});

module.exports = router;
