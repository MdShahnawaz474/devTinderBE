app.use("/user", (req,res, next)=>{
    const token = 1000
    const isAuthorize = token===1000
    if(!isAuthorize){
        res.status(400).send("user Not Authorize ");


    }else{
        console.log("User Authorize succeffuly");
        next()
        
    }
})