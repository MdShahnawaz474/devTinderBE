const express = require("express");
const connectDb = require("./config/database");
const app = express();
const port = 8000;
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  // Creating a new Instance of the User Model
  try {
    // const user = new User(userObj)
    await user.save();
    res.send("User addded succefully");
  } catch (err) {
    res.status(400).send("error"+ err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  // console.log();
  try {
    const user = await User.findOne({ emailId: userEmail });
    // res.send(user)
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong in this code ");
  }
});

app.get("/id", async (req, res) => {
  const userId = req.body._id;

  try {
    const findById = await User.findById({ _id: userId });
    // res.send(findById);

    if (findById === 0) {
      res.send("User Not found");
    } else {
      res.send(findById);
    }
  } catch (err) {
    res.status(404).send("error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete(userId);

    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      res.send("user not found");
    } else {
      res.send("User Deleted succesfully");
    }
  } catch (err) {
    res.send("something went wrong");
  }
});

app.put("/feed", async (req, res) => {
  const findUser = req.body.userId;
  try {
    const userDelete = await User.findByIdAndDelete(findUser);
    if (!userDelete) {
      res.send("User not found please fill the form correctly");
    } else {
      res.send("user deleted succeffuly ");
    }
  } catch (error) {
    res.send("Something wen wrong in the feed api ");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const Allowed_Update = [
    //   "userId",
      "skills",
      "photoUrl",
      "about",
      "gender",
      "age",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Update.includes(k)
    );
    if (!isUpdateAllowed) {
     throw new Error("Update not allowed")
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);

    res.send("UserUpdated succefully");
  } catch (err) {
    res.status(400 ).send("Update failed" + err.message);
  }
});

app.patch("/feed", async (req, res) => {
  const userid = req.body.userId;
  const data = req.body;
  try {
    const userUpdate = await User.findByIdAndUpdate({ _id: userid }, data);
    if (!userUpdate) {
      res.send("No user found");
    } else {
      res.send("User updated succefully on feed page ");
    }
  } catch (error) {
    res.status(404).send("Something went wrong in feed ");
  }
});

app.put("/feed", (req, res) => {
  const userIdfeed = req.body.userId;
});

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
