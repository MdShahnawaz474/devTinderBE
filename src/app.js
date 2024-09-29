const express = require("express");
const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("<h1>Hello from the server</h1>");
});


// app.get('/hello', function(req, res){
//     res.send("<h1>Welcome</h1>");
// });

// // app.use("/user",(req,res)=>{
// //     res.send("HAHAHAHHAHAH")
// // });

// app.get("/user", (req,res)=>{
//     res.send({
//         "firName":"MD ",
//         "lastName":"Shahnawaz",
//         "Age":"20"
//     })
// })

// app.post("/user",(req,res)=>{
//     console.log("Save data to the server");
//     res.send("Data successfully saved")
// })



// app.delete("/user",(req,res)=>{
//     console.log("Data is deleted successfully");
//     res.send("Data deleted successfully");
// });

app.get("/ab?c",(req,res)=>{
    res.send({
        "name":"MD shahnawaz",
        "age":"20"
    })
})

app.listen(port,()=>{
    console.log("listening on port",port);
    
});