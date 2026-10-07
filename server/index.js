require("dotenv").config();
const path = require("path");
const express = require("express");

require("./db"); // ensures the SQLite file + schema exist before anything else runs

const connectionsRouter = require("./routes/connections");
const queryRouter = require("./routes/query");
const historyRouter = require("./routes/history");
const modelsRouter = require("./routes/models");
const chatRouter = require("./routes/chat");
const aiProvidersRouter = require("./routes/aiProviders");
const convertSqlRouter = require("./routes/convertSql");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "2mb" }));

app.use("/api/connections", connectionsRouter);
app.use("/api/query", queryRouter);
app.use("/api/history", historyRouter);
app.use("/api/models", modelsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/ai-providers", aiProvidersRouter);
app.use("/api/convert-sql", convertSqlRouter);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Serve the frontend
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`Query Bench running at http://localhost:${PORT}`);
});
