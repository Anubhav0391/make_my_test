const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const testRouter = require("./routes/test.routes");
const answerRouter = require("./routes/answer.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tests',testRouter);
app.use('/answers',answerRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
});