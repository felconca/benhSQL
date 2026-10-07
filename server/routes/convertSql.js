const express = require("express");
const { Parser } = require("node-sql-parser");

const router = express.Router();
const parser = new Parser();

// Maps our internal dialect ids to node-sql-parser's database identifiers.
const DIALECT_MAP = {
  mysql: "mysql",
  postgres: "postgresql",
  sqlite: "sqlite",
  mssql: "transactsql",
};

// POST /api/convert-sql  { sql, sourceDialect, targetDialect }
//
// This does real AST-based translation (identifier quoting, JOIN/GROUP BY/
// HAVING/ORDER BY structure) rather than string substitution, so it's
// reliable for standard SQL. Known gaps, on purpose rather than by
// accident: dialect-specific functions (MySQL's IFNULL/DATE_FORMAT, for
// example) aren't remapped to their target-dialect equivalents, and MSSQL's
// LIMIT isn't rewritten to OFFSET/FETCH — both pass through as-is, which a
// real target database may reject. A parse failure is reported plainly
// rather than papered over.
router.post("/", (req, res) => {
  const { sql, sourceDialect, targetDialect } = req.body;

  if (!sql || !sql.trim()) return res.status(400).json({ error: "No SQL provided." });

  const from = DIALECT_MAP[sourceDialect] || "mysql";
  const to = DIALECT_MAP[targetDialect];
  if (!to) return res.status(400).json({ error: `Unsupported target dialect "${targetDialect}".` });

  try {
    const ast = parser.astify(sql, { database: from });
    const converted = parser.sqlify(ast, { database: to });
    res.json({ code: converted });
  } catch (err) {
    res.status(400).json({
      error: `Could not convert this query: ${err.message}. It may use syntax the parser doesn't recognize — try simplifying it.`,
    });
  }
});

module.exports = router;
