
const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/user");
const { scheduler } = require("timers/promises");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["ignored", "interested"];
        
        if(!allowedStatus.includes(status)){
          return  res.status(400).json({message:"Invalid Status type"+ status});
        }

        if(fromUserId==toUserId){
           return res.status(400).json({message:"Invalid request"})
        }

        const toUser = await User.findById(toUserId);

        if(!toUser){
            return res.status(404).json({
                message:"User not found"
            })
        }

        // If there is an exisiting connection request:-

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {
                    fromUserId, toUserId
                },{
                    fromUserId:toUserId,toUserId:fromUserId
                }
            ],
        })

        if(existingConnectionRequest){
            return res.status(400).send({message:'Connection request already exist'});
        }


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



// express
// request routes
// tryCatch
// fetching fromuser id
// status

// Allowedstatus
// allowed Conditional status
// selfConditional status
// find TO user 
// not found user conditions
// existing user COnnection
// existing user conditions
// connect data 

// Connection data save