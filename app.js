// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const testRouter = require("./routes/test");
const userRouter = require("./routes/user");

const app = express();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/test", testRouter);
app.use("/user", userRouter);

const port = 3001;

db.once("open", function () {
  console.log("Connected!");
  app.listen(port, () => {
    console.log("Server is up and running on port numner " + port);
  });
});
