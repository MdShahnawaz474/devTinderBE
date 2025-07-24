const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// authRouter.post("/signup", async (req, res) => {
//   try {
//     validateSignUpData(req);

//     const { firstName, lastName, emailId, password } = req.body;

//     const passwordHash = await bcrypt.hash(password, 10);
//     // console.log(passwordHash);

//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });

//     await user.save();
//     res.send("User addded succefully");
//   } catch (err) {
//     res.status(400).send("error" + err.message);
//   }
// });


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
    });
      // skills,

    await user.save();
    
    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    // Destructure emailId and password from request body
    const { emailId, password } = req.body;

    // Find user by emailId
    const user = await User.findOne({ emailId });

    const safeUser = {
      id:user.id,
      firstName: user.firstName,
      lastName:user.lastName,
      gender:user.gender,
       keySkills: user.skills,
      summary: user.summary,
      location: user.location,
      age: user.age,
      photoUrl: user.photoUrl,
      emailID: user.emailId,
    }

    if (!user) {
      return res.status(400).send("Email id is not valid");
    }

    // Compare the password with the hashed password
    const isPasswordValid = await user.passwordValidator(password);

    if(!isPasswordValid){
       return res.status(400).json({
        isSuccess: false,
        message: "Invalid credentials",
      });
    }

    if (isPasswordValid) {
      const token = await user.getJWT();
      // Set the token in a cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      return res.json({
        success: true,
        safeUser, // Only include necessary fields here, avoid password
      });
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout succefull");
});

module.exports = authRouter;
