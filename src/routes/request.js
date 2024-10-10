
const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    try {
        const user = req.user;

        console.log("Sending a connection request");
        res.send(user.firstName+"sent the connection request");
        
    } catch (error) {
        res.send(400).send("Error"+error.message);
    }
})

module.exports= requestRouter;