const express = require("express");
const app = express();
const port = 3000;
app.listen(port,()=>{
    console.log("listening on port",port);
    
});

app.get("/",(req,res)=>{
    res.send("<h1>Hello from the server</h1>");
});


app.get('/hello', function(req, res){
    res.send("<h1>Welcome</h1>");
});

