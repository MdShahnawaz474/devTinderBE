const express = require('express');
const connectDb = require("./config/database");
const app = express();
const port = 8000;
const User = require("./models/user");

app.post("/signup",async(req,res)=>{
    const userObj= {
        firstName :"Sachin tendular ",
        lastName:"Sheikh",
        email:"Ahankhan@gmail.com",
        age:20,
        password:"Ahaankhan@3493",    
    }
    // Creating a new Instance of the User Model
    try {
        const user = new User(userObj)
        await user.save();
        res.send("User addded succefully")
    } catch (err) {
        res.status(400).send("Error saving the user",err.message)
    }
});

connectDb()
    .then(()=>{
    console.log("Database connection established");
    app.listen(port, ()=>{
        console.log(`App listening on ${port}`);
        
    });
}).catch(err=>{
    console.log("Database connection Error: ",err);
    
})

