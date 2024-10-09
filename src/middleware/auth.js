const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth2 = async (req,res,next)=>{
    try {
        const {token}= req.cookies;
        if(!token){
            throw new Error("Token not found");
        }

        const decodeObj2= jwt.verify(token,"DEVTINDER@474");
        if(!decodeObj2){
            throw new Error("Token verification failed");
        }

        const {_id}= decodeObj2;

        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found");
        }
    } catch (error) {
        res.send("error",error.message)
    }
    req.user= user
    next();
}

const userAuth3 = async(req,res, next)=>{
    try {
        const {token} = req.cookies;

    if(!token){
        throw new Error("Token is not valid");
    }
    const decodeObj3 =jwt.verify(token,"DEVTINDER@474");

    if(!decodeObj3){
        res.send("something went wrong");
    }

    const {_id}= decodeObj3;

    const user = await User.findById(_id);
    
    if(!user){
        res.send("User not found")
    }

    req.user = user;
    next();

    } catch (error) {
        res.status(400).send("error :",error.message)
    }

}


const userAuth4 = async(req, res,next)=>{
    try {
        const {token}= req.cookies;
        if(!token){
            res.send("Token is not valid");
                }

        const decodeObj = jwt.verify(token,"DEVTINDER@474");
        
        if(!decodeObj){
            throw new Error("Invalid user");

        }
        const {_id}= decodeObj

        const user = await User.findById(_id)

        req.user = user;
        next();

        

    
    } catch (err) {
        throw new Error("Error:",err.message);
    }
}


const userAuth5=async(req, res,next)=>{
    try {
        const {token}= req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }

        const decodedObj = jwt.verify(token,"DEVTINDER@474");

        if(!decodedObj){
            throw new Error("User not found");
        }
        const {_id}= decodedObj;


        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;

        next();
    } catch (error) {
        
    }
}


const userAuth = async (req, res, next) => {
    try {
        // Check if cookies exist and if the token is present
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token not provided");
        }

        // Verify the token with the secret key
        const decodeObj = jwt.verify(token, "DEVTINDER@$474");

        if (!decodeObj) {
            throw new Error("Token verification failed");
        }

        const { _id } = decodeObj;

        // Find the user by ID
        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // Sending proper error response
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    userAuth,
};
