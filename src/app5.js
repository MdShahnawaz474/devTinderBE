const express = require("express")
const app = express();

const port = 7000;

app.use("/user", (req,res)=>{
    try {
        throw new Error 
        res.send("user Data send Successfully")       
    } catch (err) {
        res.status(500).send("Something went wrong contact to support team ")
    }
})


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
    
});

