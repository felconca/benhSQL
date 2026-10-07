// Splits a block of SQL text into individual statements on top-level
// semicolons only — one that isn't inside a string literal, a quoted
// identifier, or a comment. This is a character-scanning state machine,
// not a real SQL parser: it doesn't understand SQL grammar at all, it just
// tracks "am I currently inside a string/comment" so a semicolon in
// `'it;s fine'` or `-- see rule 12;` doesn't get treated as a separator.
function splitSqlStatements(sql) {
  const statements = [];
  let current = "";
  let i = 0;
  const len = sql.length;
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  while (i < len) {
    const ch = sql[i];
    const next = sql[i + 1];

    if (inLineComment) {
      current += ch;
      if (ch === "\n") inLineComment = false;
      i++;
      continue;
    }
    if (inBlockComment) {
      current += ch;
      if (ch === "*" && next === "/") {
        current += next;
        i += 2;
        inBlockComment = false;
        continue;
      }
      i++;
      continue;
    }
    if (inSingle) {
      current += ch;
      if (ch === "'" && next === "'") {
        current += next; // escaped '' inside a string — stay inside the string
        i += 2;
        continue;
      }
      if (ch === "'") inSingle = false;
      i++;
      continue;
    }
    if (inDouble) {
      current += ch;
      if (ch === '"' && next === '"') {
        current += next;
        i += 2;
        continue;
      }
      if (ch === '"') inDouble = false;
      i++;
      continue;
    }
    if (inBacktick) {
      current += ch;
      if (ch === "`") inBacktick = false;
      i++;
      continue;
    }

    // Not currently inside any special region.
    if (ch === "-" && next === "-") {
      inLineComment = true;
      current += ch;
      i++;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      current += ch;
      i++;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      current += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      current += ch;
      i++;
      continue;
    }
    if (ch === "`") {
      inBacktick = true;
      current += ch;
      i++;
      continue;
    }
    if (ch === ";") {
      statements.push(current);
      current = "";
      i++;
      continue;
    }
    current += ch;
    i++;
  }
  if (current.trim() !== "") statements.push(current);

  return statements.map((s) => s.trim()).filter((s) => s.length > 0);
}

module.exports = { splitSqlStatements };
