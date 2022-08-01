// create express web server

const express = require("express");
const logger = require("./logger");
const app = express();

app.get("/", (req, res) => {
  logger.info("Hello World");
  res.send("Hello World!");
});

app.get('/debug', (req, res) => {
  logger.debug("This is a debug message");
  res.send("Debug logged");
})

app.get('/warning', (req, res) => {
  logger.warn("This is a warning message");
  res.send("Warning logged");
})

app.get('/error', (req, res) => {
  try {
    throw new Error( new Date().getMinutes() + '_'+"This is an error trace");
  } catch (error) {
    logger.error(error);
    res.send("Error logged");
  }
})

app.listen(3000, () => {
  console.info("Server started on port 3000");
})