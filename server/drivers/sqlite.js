const Database = require("better-sqlite3");

// SQLite connections are kept open per connection id — reopening the file
// on every query would be wasteful and can churn the file lock. Unlike the
// MySQL/Postgres drivers there's no real "pool" here since a SQLite
// connection is just a handle to a local file, not a network socket.
const openDbs = new Map();

function getDb(conn) {
  if (!openDbs.has(conn.id)) {
    const db = new Database(conn.filePath, { fileMustExist: true });
    db.pragma("journal_mode = WAL");
    openDbs.set(conn.id, db);
  }
  return openDbs.get(conn.id);
}

function closePools(connectionId) {
  const db = openDbs.get(connectionId);
  if (db) {
    db.close();
    openDbs.delete(connectionId);
  }
}

async function testConnection(conn) {
  if (!conn.filePath) throw new Error("No file selected — upload a .sqlite/.db file first.");
  const db = new Database(conn.filePath, { fileMustExist: true, readonly: true });
  try {
    db.prepare("SELECT 1").get();
  } finally {
    db.close();
  }
}

// SQLite has no concept of multiple databases within one file connection
// the way MySQL/Postgres do — the file itself IS the database. Returning a
// single pseudo-entry keeps the existing three-level (connection > database
// > table) schema tree working without special-casing SQLite in the UI.
async function listDatabases(conn) {
  return ["main"];
}

async function listTables(conn, database) {
  const db = getDb(conn);
  const rows = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    .all();
  return rows.map((r) => r.name);
}

async function listColumns(conn, database, table) {
  const db = getDb(conn);
  const validTables = new Set(await listTables(conn, database));
  if (!validTables.has(table)) throw new Error(`No table named "${table}".`);
  // PRAGMA doesn't support parameter binding for the table name; the
  // identifier is checked against the real table list just above first,
  // so this isn't an injection path despite the string interpolation.
  const rows = db.prepare(`PRAGMA table_info("${table}")`).all();
  return rows.map((r) => ({
    name: r.name,
    dataType: r.type || "TEXT",
    isPrimaryKey: r.pk > 0,
    nullable: r.notnull === 0,
  }));
}

// SQLite has no single system catalog for foreign keys across the whole
// database — PRAGMA foreign_key_list only reports one table at a time —
// so this loops over every table and merges the results.
async function listForeignKeys(conn, database) {
  const db = getDb(conn);
  const tables = await listTables(conn, database);
  const fks = [];
  for (const table of tables) {
    const rows = db.prepare(`PRAGMA foreign_key_list("${table}")`).all();
    rows.forEach((r) => {
      fks.push({ fromTable: table, fromColumn: r.from, toTable: r.table, toColumn: r.to });
    });
  }
  return fks;
}

async function runQuery(conn, database, sql, maxRows) {
  const db = getDb(conn);
  const trimmed = sql.trim().replace(/;+\s*$/, "");
  const start = Date.now();
  const stmt = db.prepare(trimmed);

  if (stmt.reader) {
    // SELECT-style statement
    const columns = stmt.columns().map((c) => c.name);
    const all = stmt.all();
    const ms = Date.now() - start;
    const limited = all.slice(0, maxRows);
    const rows = limited.map((row) => columns.map((c) => row[c]));
    return { columns, rows, rowCount: all.length, truncated: all.length > maxRows, ms };
  }

  // INSERT/UPDATE/DELETE/DDL
  const info = stmt.run();
  const ms = Date.now() - start;
  return {
    columns: ["changes", "lastInsertRowid"],
    rows: [[info.changes, info.lastInsertRowid]],
    rowCount: info.changes,
    truncated: false,
    ms,
  };
}

module.exports = { testConnection, listDatabases, listTables, listColumns, listForeignKeys, runQuery, closePools };
