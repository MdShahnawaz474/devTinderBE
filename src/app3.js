const express = require('express');

const app = express();
const port = 8000;

app.get("/user",(req,res,next)=>{
    // res.send("Handling a request user 1")
    
    console.log("Handling a request user 1");
    next();
    
})

app.get("/user",(req,res,next)=>{
    
    // res.send("Handling a request user 2")

    console.log("Handling a request user 2");
    // next();
    
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
})