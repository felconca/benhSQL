const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const dbFile = process.env.DB_FILE || "./data/BenhSQL.sqlite";
const resolvedPath = path.resolve(process.cwd(), dbFile);
fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

const db = new Database(resolvedPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('mysql', 'postgres', 'sqlite')),
    host TEXT,
    port INTEGER,
    username TEXT,
    password_encrypted TEXT,
    default_database TEXT,
    file_path TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS history (
    id TEXT PRIMARY KEY,
    connection_id TEXT,
    connection_name TEXT,
    connection_type TEXT,
    database_name TEXT,
    query_text TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('success', 'error')),
    error_message TEXT,
    row_count INTEGER,
    duration_ms INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_history_created_at ON history(created_at DESC);

  CREATE TABLE IF NOT EXISTS local_models (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    size_bytes INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS ai_providers (
    provider TEXT PRIMARY KEY CHECK (provider IN ('anthropic', 'openai', 'xai', 'custom')),
    api_key_encrypted TEXT NOT NULL,
    base_url TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Installs that ran before the 'custom' provider was added have this table
// without base_url and with a narrower CHECK constraint. SQLite can't alter
// a CHECK constraint or add a column mid-migration in one step, so recreate
// the table under the new shape and copy any existing rows across.
const aiProvidersColumns = db.prepare("PRAGMA table_info(ai_providers)").all();
const hasBaseUrl = aiProvidersColumns.some((c) => c.name === "base_url");
if (aiProvidersColumns.length > 0 && !hasBaseUrl) {
  db.exec(`
    ALTER TABLE ai_providers RENAME TO ai_providers_old;
    CREATE TABLE ai_providers (
      provider TEXT PRIMARY KEY CHECK (provider IN ('anthropic', 'openai', 'xai', 'custom')),
      api_key_encrypted TEXT NOT NULL,
      base_url TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO ai_providers (provider, api_key_encrypted, updated_at)
      SELECT provider, api_key_encrypted, updated_at FROM ai_providers_old;
    DROP TABLE ai_providers_old;
  `);
}

// Same situation for connections: older installs have NOT NULL host/port,
// no file_path, and a CHECK constraint that doesn't allow 'sqlite'.
const connectionsColumns = db.prepare("PRAGMA table_info(connections)").all();
const hasFilePath = connectionsColumns.some((c) => c.name === "file_path");
if (connectionsColumns.length > 0 && !hasFilePath) {
  db.exec(`
    ALTER TABLE connections RENAME TO connections_old;
    CREATE TABLE connections (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('mysql', 'postgres', 'sqlite')),
      host TEXT,
      port INTEGER,
      username TEXT,
      password_encrypted TEXT,
      default_database TEXT,
      file_path TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO connections (id, name, type, host, port, username, password_encrypted, default_database, created_at)
      SELECT id, name, type, host, port, username, password_encrypted, default_database, created_at FROM connections_old;
    DROP TABLE connections_old;
  `);
}

module.exports = db;
