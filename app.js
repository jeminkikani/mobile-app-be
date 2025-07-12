require("dotenv").config();
const express = require("express");
const ip = require("ip");
global.func = require('./utils/utility-functions')
// const router = require("./src/route");

const cors = require("cors");
const { dbConnection } = require("./utils/dbConnection");
const Router = require("./utils/routes");
const app = express();

app.use(cors("*"));
process.on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Rejection:", err);
  // You can log the error, send an email notification, or perform any other necessary action
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);f
  // You can log the error, send an email notification, or perform any other necessary action
  process.exit(1); // Exit the process with a non-zero exit code
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static("public"));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  dbConnection()
  console.log(`Server is running on http://${ip.address()}:${PORT}`);
});
