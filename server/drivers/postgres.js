const { Pool } = require("pg");

// Postgres can't switch databases on an existing connection, so every
// (connection, database) pair gets its own pool.
const pools = new Map();

function getPool(conn, database) {
  const db = database || conn.defaultDatabase || "postgres";
  const key = `${conn.id}::${db}`;
  if (!pools.has(key)) {
    pools.set(
      key,
      new Pool({
        host: conn.host,
        port: conn.port,
        user: conn.username,
        password: conn.password,
        database: db,
        max: 5,
        connectionTimeoutMillis: 8000,
      }),
    );
  }
  return pools.get(key);
}

function closePools(connectionId) {
  for (const [key, pool] of pools.entries()) {
    if (key.startsWith(`${connectionId}::`)) {
      pool.end().catch(() => {});
      pools.delete(key);
    }
  }
}

async function testConnection(conn) {
  const pool = new Pool({
    host: conn.host,
    port: conn.port,
    user: conn.username,
    password: conn.password,
    database: conn.defaultDatabase || "postgres",
    max: 1,
    connectionTimeoutMillis: 6000,
  });
  try {
    await pool.query("SELECT 1");
  } finally {
    await pool.end();
  }
}

async function listDatabases(conn) {
  const pool = getPool(conn, conn.defaultDatabase || "postgres");
  const { rows } = await pool.query(
    `SELECT datname FROM pg_database WHERE datistemplate = false AND datallowconn = true ORDER BY datname`,
  );
  return rows.map((r) => r.datname);
}

async function listTables(conn, database) {
  const pool = getPool(conn, database);
  const { rows } = await pool.query(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
     ORDER BY table_schema, table_name`,
  );
  return rows.map((r) => r.table_name);
}

async function listColumns(conn, database, table) {
  const pool = getPool(conn, database);
  const { rows } = await pool.query(
    `SELECT c.column_name AS name, c.data_type AS "dataType", c.is_nullable AS "isNullable",
       EXISTS (
         SELECT 1
         FROM information_schema.table_constraints tc
         JOIN information_schema.key_column_usage kcu
           ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
         WHERE tc.constraint_type = 'PRIMARY KEY'
           AND tc.table_schema = c.table_schema
           AND tc.table_name = c.table_name
           AND kcu.column_name = c.column_name
       ) AS "isPrimaryKey"
     FROM information_schema.columns c
     WHERE c.table_name = $1
     ORDER BY c.ordinal_position`,
    [table],
  );
  return rows.map((r) => ({
    name: r.name,
    dataType: r.dataType,
    isPrimaryKey: r.isPrimaryKey,
    nullable: r.isNullable === "YES",
  }));
}

// For the ER diagram: every FK relationship in the database in one query,
// rather than one round-trip per table.
async function listForeignKeys(conn, database) {
  const pool = getPool(conn, database);
  const { rows } = await pool.query(
    `SELECT tc.table_name AS "fromTable", kcu.column_name AS "fromColumn",
            ccu.table_name AS "toTable", ccu.column_name AS "toColumn"
     FROM information_schema.table_constraints tc
     JOIN information_schema.key_column_usage kcu
       ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
     JOIN information_schema.constraint_column_usage ccu
       ON tc.constraint_name = ccu.constraint_name AND tc.table_schema = ccu.table_schema
     WHERE tc.constraint_type = 'FOREIGN KEY'`,
  );
  return rows.map((r) => ({
    fromTable: r.fromTable,
    fromColumn: r.fromColumn,
    toTable: r.toTable,
    toColumn: r.toColumn,
  }));
}

async function runQuery(conn, database, sql, maxRows) {
  const pool = getPool(conn, database);
  const start = Date.now();
  const result = await pool.query(sql);
  const ms = Date.now() - start;

  if (result.fields && result.fields.length > 0) {
    const columns = result.fields.map((f) => f.name);
    const limited = result.rows.slice(0, maxRows);
    const rows = limited.map((row) => columns.map((c) => row[c]));
    return {
      columns,
      rows,
      rowCount: result.rowCount ?? result.rows.length,
      truncated: result.rows.length > maxRows,
      ms,
    };
  }
  return {
    columns: ["command", "rowCount"],
    rows: [[result.command, result.rowCount ?? 0]],
    rowCount: result.rowCount ?? 0,
    truncated: false,
    ms,
  };
}

module.exports = { testConnection, listDatabases, listTables, listColumns, listForeignKeys, runQuery, closePools };
