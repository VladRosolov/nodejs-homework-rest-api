const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const fs = require("fs/promises");
const moment = require("moment");

const contactsRouter = require("./routes/api/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  const { method, url } = req;
  const date = moment().format("YYYY-MM-DD_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

// app.get("/", (request, response) => {
//   console.log(request.url);
//   console.log(request.method);
//   response.json([]);
// });
// app.get("/api/contacts", (request, response) => {
//   // console.log(request.url);
//   // console.log(request.method);
//   response.json(contacts);
// });

module.exports = app;
