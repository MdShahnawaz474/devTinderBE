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
      const safeUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId:user.emailId,
      age:user.age,
      gender:user.gender,
      photoUrl: user.photoUrl,
      about: user.about,
      skills: user.skills,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    res.send(safeUser);
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
    
   await loggedInUser.save();

    // console.log(userSave);
    
     return res.status(200).json({
      success: true,
      message: `${loggedInUser.firstName}, your profile was updated successfully.`,
      data: loggedInUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating your profile.",
      error: error.message,
    });
  }
});


module.exports = profileRouter;
