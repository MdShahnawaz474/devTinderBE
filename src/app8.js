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

// Api's
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // Creating a new Instance of the User Model
  try {

    validateSignUpData(req)

    const {firstName,lastName, emailId,password}=req.body;

    const passwordHash =await  bcrypt.hash(password,10)
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
    
    await user.save();
    res.send("User addded succefully");
  } catch (err) {
    res.status(400).send("error"+ err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Destructure emailId and password from request body
    const { emailId, password } = req.body;

    // Find user by emailId
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).send("Email id is not valid");
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      // Generate JWT token
      const token = await jwt.sign({ _id: user._id }, "DEVTINDER@$474");
      console.log(token);
      
      // Set the token in a cookie (uncomment if needed)
      res.cookie("token",token );
      
      return res.send("Login successful");
    } else {
      return res.status(400).send("Incorrect password");
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


app.post("/profile",userAuth, async(req,res)=>{
  try{
    const user = req.user
  res.send(user); }
  catch(error){
    res.status(500).send("Error: " + error.message);
  }
})


app.post("/sendconnectionrequest", userAuth, async(req,res)=>{
    console.log("Sendingg a connection request");
    
    const user = req.user;
   
    
  res.send(user.firstName+ " Is sending a request");
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