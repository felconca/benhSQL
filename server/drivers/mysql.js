const mysql = require("mysql2/promise");

// Pools keyed by `${connectionId}::${database||''}` so we reuse sockets
// across requests instead of opening a new one per query.
const pools = new Map();

function getPool(conn, database) {
  const key = `${conn.id}::${database || ""}`;
  if (!pools.has(key)) {
    pools.set(
      key,
      mysql.createPool({
        host: conn.host,
        port: conn.port,
        user: conn.username,
        password: conn.password,
        database: database || undefined,
        waitForConnections: true,
        connectionLimit: 5,
        connectTimeout: 8000,
        dateStrings: true,
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
  const pool = mysql.createPool({
    host: conn.host,
    port: conn.port,
    user: conn.username,
    password: conn.password,
    connectionLimit: 1,
    connectTimeout: 6000,
  });
  try {
    await pool.query("SELECT 1");
  } finally {
    await pool.end();
  }
}

async function listDatabases(conn) {
  const pool = getPool(conn, null);
  const [rows] = await pool.query("SHOW DATABASES");
  return rows.map((r) => r.Database).filter((name) => !["information_schema"].includes(name) || true);
}

async function listTables(conn, database) {
  const pool = getPool(conn, database);
  const [rows] = await pool.query("SHOW TABLES");
  const key = Object.keys(rows[0] || {})[0];
  return rows.map((r) => r[key]);
}

async function listColumns(conn, database, table) {
  const pool = getPool(conn, database);
  const [rows] = await pool.query(
    `SELECT COLUMN_NAME AS name, DATA_TYPE AS dataType, COLUMN_KEY AS columnKey, IS_NULLABLE AS isNullable
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
     ORDER BY ORDINAL_POSITION`,
    [database, table],
  );
  return rows.map((r) => ({
    name: r.name,
    dataType: r.dataType,
    isPrimaryKey: r.columnKey === "PRI",
    nullable: r.isNullable === "YES",
  }));
}

// For the ER diagram: every FK relationship in the database in one query,
// rather than one round-trip per table.
async function listForeignKeys(conn, database) {
  const pool = getPool(conn, database);
  const [rows] = await pool.query(
    `SELECT TABLE_NAME AS fromTable, COLUMN_NAME AS fromColumn,
            REFERENCED_TABLE_NAME AS toTable, REFERENCED_COLUMN_NAME AS toColumn
     FROM information_schema.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = ? AND REFERENCED_TABLE_NAME IS NOT NULL`,
    [database],
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
  const [result, fields] = await pool.query(sql);
  const ms = Date.now() - start;

  if (Array.isArray(result)) {
    // SELECT-style result
    const columns = (fields || []).map((f) => f.name);
    const limited = result.slice(0, maxRows);
    const rows = limited.map((row) => columns.map((c) => row[c]));
    return { columns, rows, rowCount: result.length, truncated: result.length > maxRows, ms };
  }
  // INSERT/UPDATE/DELETE/DDL-style result (OkPacket)
  return {
    columns: ["affectedRows", "changedRows", "insertId", "warningStatus"],
    rows: [[result.affectedRows ?? 0, result.changedRows ?? 0, result.insertId ?? null, result.warningStatus ?? 0]],
    rowCount: result.affectedRows ?? 0,
    truncated: false,
    ms,
  };
}

module.exports = { testConnection, listDatabases, listTables, listColumns, listForeignKeys, runQuery, closePools };
