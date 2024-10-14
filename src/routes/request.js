
const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequests");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId
        const status = req.params.status

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const connectionData = await connectionRequest.save();

        res.json({
            message:"Connection request send succefully!!",connectionData
        });

        
    } catch (error) {
       res.status(400).send("error"+error.message)
    }
})

module.exports= requestRouter;