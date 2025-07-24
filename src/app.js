require('dotenv').config();

const express = require("express")
const app =express();
const port = 8000;
const cookieParser = require("cookie-parser");
const connectDb = require("./config/database");
const cors = require("cors");

// const express = require("express");
//Uses


app.use(cors({
  origin: 'http://localhost:5173', // Use your frontend origin here
  credentials: true               // Allow credentials (cookies, auth headers)
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user");
const paymentRouter = require('./routes/payment');


    
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

app.get("/",(req,res)=>{
  res.send("Hi this is devtinder")
})


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