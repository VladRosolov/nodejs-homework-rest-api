const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");

const nodemailer = require("nodemailer");
// const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "canevop861@webonoid.com",
//   from: "vladrosolov@ukr.net",
//   subject: "Verify email",
//   html: `<p>Verify email</p>`,
// };

// sgMail
//   .send(email)
//   .then(() => console.log("email send success"))
//   .catch((err) => console.log(err.message));

// =======================================================================================
const { USER_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp-relay.gmail.com",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: "vladvr4858@gmail.com",
    pass: USER_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "wanetop301@webonoid.com",
  from: "vladvr4858@gmail.com",
  subject: "Verify email",
  html: `<p>Verify email</p>`,
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

// =======================================================================================

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
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

module.exports = app;
