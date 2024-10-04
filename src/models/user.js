
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName :{
        type: String,

    },
    emailId:{
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
    },
    age:{
        type:'Number',
        min:18
    },
    gender:{
     type:String,
     validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid")
        }
     }
    },
    photoUrl:{
        type:String,
        default:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
    },
    about:{
        type:String,
        default:"This is default value of the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true, 
})

const User = mongoose.model("User", userSchema);

module.exports = User;