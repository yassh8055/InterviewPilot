const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json()); //allow to read data in req.body
app.use(cookieParser()); //parse the Cookie header
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//require all ROUTES
const authRouter = require("./Routes/authRouter");
const interviewRouter = require("./Routes/interview");

//using all routes here
app.use("/api/auth", authRouter);
app.use("/api/interview",interviewRouter)

module.exports = app;
