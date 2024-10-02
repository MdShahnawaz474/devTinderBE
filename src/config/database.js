const mongoose = require ("mongoose");

const connectDb= async()=>{
    await mongoose.connect("mongodb+srv://mdshahnawazm17:0786%401234@cluster0.ucjqz7r.mongodb.net/devTinder")
}
module.exports= connectDb;

