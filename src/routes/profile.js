const express = require('express');
const { userAuth } = require('../middleware/auth');

const profileRouter = express.Router(); 

profileRouter.get("/profile/view", userAuth , async (req,res)=>{
    try {
        const user = await req.user;
        res.send(user);
        
    } catch (error) {
        res.status(400).send("Error"+ error.message);
    }
});


module.exports= profileRouter;