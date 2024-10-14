const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validate } = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcryptjs/dist/bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      res.send("this is not valid data");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    
  const userSave =  await loggedInUser.save();

    console.log(userSave);
    
    res.json({
        message: `${loggedInUser.firstName},Your profile updated Succefull`, data:loggedInUser});

  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});


module.exports = profileRouter;
