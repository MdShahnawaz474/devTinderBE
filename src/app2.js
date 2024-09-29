const express = require('express');

const app = express();

const port = 8000;

app.use("/user",(req, res,next)=>{
    //route Handler
    console.log("1st handling request");

    // res.send("1st handling request...");
    next();

},
(req, res, next)=>{
    console.log("2nd handling request");
    // res.send("2nd handling request...");
    next();
},(req,res, next)=>{
    console.log("3rd handling request");
    // res.send("3rd handling request...");
    // next();
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});