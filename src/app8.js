const express = require("express")
const app =express();
const port = 8000;
const User = require("./models/user");
const {validateSignUpData}= require("./utils/validation")
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth");
const connectDb = require("./config/database");

// const express = require("express");
//Uses
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDb()

  .then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`App listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection Error: ", err);
  });