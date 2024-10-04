
const mongoose = require('mongoose');
const validator = require("validator");

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
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email adress"+ value);
            }
        }
    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong"+value);
            }
        }
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
        default:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url" + value);
            } 
        }
    },
    about:{
        type:String,
        default:"This is default value of the user"
    },
    skills:{
        type:[String],
    validate(skills){
        if(skills.length ===10){
            throw new Error("You can not add above 4 skilss")
        }
    }
        
    }
},{
    timestamps:true, 
})

const User = mongoose.model("User", userSchema);

module.exports = User;