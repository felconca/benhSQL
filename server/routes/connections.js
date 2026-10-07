const express = require("express");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const db = require("../db");
const { encrypt, decrypt } = require("../crypto");
const driverManager = require("../driverManager");

const router = express.Router();

function toPublic(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    host: row.host,
    port: row.port,
    username: row.username,
    defaultDatabase: row.default_database,
    filePath: row.file_path,
    createdAt: row.created_at,
  };
}

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

function loadConnectionOr404(req, res) {
  const row = db.prepare("SELECT * FROM connections WHERE id = ?").get(req.params.id);
  if (!row) {
    res.status(404).json({ error: `No connection with id "${req.params.id}"` });
    return null;
  }
  return row;
}

function validateBody(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push("Name is required.");
  if (!["mysql", "postgres", "sqlite"].includes(body.type))
    errors.push('Type must be "mysql", "postgres", or "sqlite".');
  if (body.type === "sqlite") {
    if (!body.filePath || !body.filePath.trim()) errors.push("Upload a .sqlite/.db file first.");
  } else {
    if (!body.host || !body.host.trim()) errors.push("Host is required.");
    if (!body.port || isNaN(Number(body.port))) errors.push("Port must be a number.");
  }
  return errors;
}

// SQLite files can be large — stream straight to disk like the local-model
// and connection-picture uploads elsewhere in the app, rather than
// buffering in memory.
const SQLITE_DIR = path.resolve(process.cwd(), process.env.SQLITE_DIR || "./data/sqlite-dbs");
fs.mkdirSync(SQLITE_DIR, { recursive: true });
const sqliteUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, SQLITE_DIR),
    filename: (req, file, cb) => {
      const prefix = crypto.randomBytes(4).toString("hex");
      const ext = path.extname(file.originalname) || ".sqlite";
      cb(null, `${prefix}${ext}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB ceiling
});

// POST /api/connections/upload-sqlite — uploads a .sqlite/.db file and
// returns the server-side path to use when testing/creating the
// connection. Separate step from Save, since Test needs the file to
// already exist on disk before it can open it.
router.post("/upload-sqlite", (req, res) => {
  sqliteUpload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ error: `Upload failed: ${err.message}` });
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    res.status(201).json({ filePath: req.file.path, originalName: req.file.originalname, sizeBytes: req.file.size });
  });
});

// GET /api/connections — list, passwords never included
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM connections ORDER BY created_at ASC").all();
  res.json(rows.map(toPublic));
});

// POST /api/connections/test — try connecting without saving anything
router.post("/test", async (req, res) => {
  const errors = validateBody(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });
  try {
    await driverManager.testConnection({
      id: "test",
      type: req.body.type,
      host: req.body.host,
      port: req.body.port ? Number(req.body.port) : null,
      username: req.body.username,
      password: req.body.password,
      defaultDatabase: req.body.defaultDatabase,
      filePath: req.body.filePath,
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// POST /api/connections — create + persist (password encrypted)
router.post("/", (req, res) => {
  const errors = validateBody(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });

  let passwordEncrypted;
  try {
    passwordEncrypted = encrypt(req.body.password || "");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const row = {
    id: crypto.randomUUID(),
    name: req.body.name.trim(),
    type: req.body.type,
    host: req.body.type === "sqlite" ? null : req.body.host.trim(),
    port: req.body.type === "sqlite" ? null : Number(req.body.port),
    username: req.body.username || "",
    password_encrypted: passwordEncrypted,
    default_database: req.body.defaultDatabase || null,
    file_path: req.body.type === "sqlite" ? req.body.filePath : null,
  };

  db.prepare(
    `
    INSERT INTO connections (id, name, type, host, port, username, password_encrypted, default_database, file_path)
    VALUES (@id, @name, @type, @host, @port, @username, @password_encrypted, @default_database, @file_path)
  `,
  ).run(row);

  res.status(201).json(toPublic({ ...row, created_at: new Date().toISOString() }));
});

// DELETE /api/connections/:id
router.delete("/:id", (req, res) => {
  const row = loadConnectionOr404(req, res);
  if (!row) return;
  driverManager.closePools(toInternal(row));
  if (row.type === "sqlite" && row.file_path) {
    fs.unlink(row.file_path, () => {}); // best-effort — not fatal if already gone
  }
  db.prepare("DELETE FROM connections WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

// GET /api/connections/:id/databases
router.get("/:id/databases", async (req, res) => {
  const row = loadConnectionOr404(req, res);
  if (!row) return;
  try {
    const databases = await driverManager.listDatabases(toInternal(row));
    res.json(databases);
  } catch (err) {
    res.status(502).json({ error: `Could not list databases: ${err.message}` });
  }
});

// GET /api/connections/:id/databases/:database/tables
router.get("/:id/databases/:database/tables", async (req, res) => {
  const row = loadConnectionOr404(req, res);
  if (!row) return;
  try {
    const tables = await driverManager.listTables(toInternal(row), req.params.database);
    res.json(tables);
  } catch (err) {
    res.status(502).json({ error: `Could not list tables: ${err.message}` });
  }
});

// GET /api/connections/:id/databases/:database/tables/:table/columns
router.get("/:id/databases/:database/tables/:table/columns", async (req, res) => {
  const row = loadConnectionOr404(req, res);
  if (!row) return;
  try {
    const columns = await driverManager.listColumns(toInternal(row), req.params.database, req.params.table);
    res.json(columns);
  } catch (err) {
    res.status(502).json({ error: `Could not list columns: ${err.message}` });
  }
});

// GET /api/connections/:id/databases/:database/schema-diagram — everything
// the ER diagram needs in one round trip: every table's columns plus every
// FK relationship in the database, rather than the frontend making a
// separate columns request per table.
router.get("/:id/databases/:database/schema-diagram", async (req, res) => {
  const row = loadConnectionOr404(req, res);
  if (!row) return;
  const conn = toInternal(row);
  try {
    const tableNames = await driverManager.listTables(conn, req.params.database);
    const tables = await Promise.all(
      tableNames.map(async (name) => ({
        name,
        columns: await driverManager.listColumns(conn, req.params.database, name),
      })),
    );
    const foreignKeys = await driverManager.listForeignKeys(conn, req.params.database);
    res.json({ tables, foreignKeys });
  } catch (err) {
    res.status(502).json({ error: `Could not load schema diagram: ${err.message}` });
  }
});

module.exports = router;
