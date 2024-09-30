const express = require("express");
const app = express();
const port = 8000;

const {adminAuth,userAuth} = require("./middleware/auth")

app.use("/admin",adminAuth)
app.use("/user",userAuth)
app.get("/admin/getAllData",(req,res)=>{
    res.send("All data is fetched Welcome admin ")
    
})

app.get("/user/data",(req,res)=>{
    res.send("User Data fetched")
    console.log("user Data fetched");    
})

app.get("/admin/getData",(req,res)=>{
    res.send("All data is here ")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("User deleted succefully");
})

app.listen(port,()=>{console.log(`App is listening on port ${port}`);
})