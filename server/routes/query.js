const express = require("express");
const crypto = require("crypto");
const db = require("../db");
const { decrypt } = require("../crypto");
const driverManager = require("../driverManager");
const { splitSqlStatements } = require("../sqlSplitter");

const router = express.Router();

const MAX_ROWS = Math.min(Number(process.env.MAX_ROWS) || 1000, 10000);

function toInternal(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    host: row.host,
    port: row.port,
    username: row.username,
    password: row.password_encrypted ? decrypt(row.password_encrypted) : "",
    defaultDatabase: row.default_database,
    filePath: row.file_path,
  };
}

function recordHistory({ connRow, database, sql, status, errorMessage, rowCount, ms }) {
  db.prepare(
    `
    INSERT INTO history (id, connection_id, connection_name, connection_type, database_name, query_text, status, error_message, row_count, duration_ms)
    VALUES (@id, @connection_id, @connection_name, @connection_type, @database_name, @query_text, @status, @error_message, @row_count, @duration_ms)
  `,
  ).run({
    id: crypto.randomUUID(),
    connection_id: connRow ? connRow.id : null,
    connection_name: connRow ? connRow.name : null,
    connection_type: connRow ? connRow.type : null,
    database_name: database || null,
    query_text: sql,
    status,
    error_message: errorMessage || null,
    row_count: rowCount ?? null,
    duration_ms: ms ?? null,
  });
}

// POST /api/query  { connectionId, database, sql }
router.post("/", async (req, res) => {
  const { connectionId, database, sql } = req.body;

  if (!sql || !sql.trim()) {
    return res.status(400).json({ status: "error", message: "Query text is empty." });
  }
  if (!connectionId) {
    return res.status(400).json({ status: "error", message: "No connection selected." });
  }

  const connRow = db.prepare("SELECT * FROM connections WHERE id = ?").get(connectionId);
  if (!connRow) {
    return res.status(404).json({ status: "error", message: `No connection with id "${connectionId}".` });
  }

  const statements = splitSqlStatements(sql);
  if (statements.length === 0) {
    return res.status(400).json({ status: "error", message: "Query text is empty." });
  }

  // Single statement — exactly the original behavior and response shape,
  // untouched, so nothing that already depends on it needs to change.
  if (statements.length === 1) {
    try {
      const result = await driverManager.runQuery(toInternal(connRow), database, statements[0], MAX_ROWS);
      recordHistory({
        connRow,
        database,
        sql: statements[0],
        status: "success",
        rowCount: result.rowCount,
        ms: result.ms,
      });
      res.json({
        status: "success",
        columns: result.columns,
        rows: result.rows,
        rowCount: result.rowCount,
        truncated: result.truncated,
        ms: result.ms,
      });
    } catch (err) {
      recordHistory({ connRow, database, sql: statements[0], status: "error", errorMessage: err.message });
      res.status(400).json({ status: "error", message: err.message });
    }
    return;
  }

  // Multiple statements: run each in turn against the same driver call every
  // single-statement query already goes through — no driver-specific
  // multi-statement handling needed, since each driver only ever sees one
  // statement per call, exactly like today. Every statement runs regardless
  // of whether an earlier one failed, so one bad statement in a batch
  // doesn't hide the results of the others; each gets its own history entry
  // too, same as if they'd been run one at a time.
  const results = [];
  for (const statement of statements) {
    try {
      const result = await driverManager.runQuery(toInternal(connRow), database, statement, MAX_ROWS);
      recordHistory({ connRow, database, sql: statement, status: "success", rowCount: result.rowCount, ms: result.ms });
      results.push({
        status: "success",
        sql: statement,
        columns: result.columns,
        rows: result.rows,
        rowCount: result.rowCount,
        truncated: result.truncated,
        ms: result.ms,
      });
    } catch (err) {
      recordHistory({ connRow, database, sql: statement, status: "error", errorMessage: err.message });
      results.push({ status: "error", sql: statement, message: err.message });
    }
  }
  res.json({ status: "success", multi: true, results });
});

module.exports = router;
