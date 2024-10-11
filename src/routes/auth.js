const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require("jsonwebtoken");


const authRouter=express.Router();

authRouter.post("/signup", async (req, res) => {
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

  authRouter.post("/login", async (req, res) => {
    try {
      // Destructure emailId and password from request body
      const { emailId, password } = req.body;
  
      // Find user by emailId
      const user = await User.findOne({ emailId });
  
      if (!user) {
        return res.status(400).send("Email id is not valid");
      }
  
      // Compare the password with the hashed password
      const isPasswordValid = user.passwordValidator(password)
      
      if (isPasswordValid) {
        
          const token = await user.getJWT();
        // Set the token in a cookie 
        res.cookie("token",token ,{
          expires: new Date(Date.now()+8*3600000),
        }); 
        
        return res.send("Login successful");
      } else {
        return res.status(400).send("Incorrect password");
      }
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
  });

  

  authRouter.post("/logout",(req,res)=>{
    res.cookie("token", null,{
      expires:new Date(Date.now())
    })
    res.send("Logout succefull");
  })

module.exports= authRouter;