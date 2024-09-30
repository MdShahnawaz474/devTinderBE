const adminAuth = (req,res,next)=>{
    const token = "abc"
    const isAuthorize= token==="abc"
    if(!isAuthorize){
        console.log("Not Authorize");
        res.status(401).send("Admin Not Authorize");
        
    }else{
        console.log("Authorize success");
        
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token= "1234"
    const isAuthorize = token ==="1234";
    if(!isAuthorize){
        res.status(401).send("User Not Authorized");
        console.log("User Not authorized");
        
    }else{

        console.log();
        next()
    }
}

module.exports={
    adminAuth, userAuth
}