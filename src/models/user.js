
const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minlength:[3,'First name must be at least 3 characters long.'],
        maxlength:[50,'First name cannot exceed 50 characters.'],
        
        
    },
    lastName :{
        type: String,
        minlength:[3, 'Last name must be at least 3 characters long.'],
        maxlength:[50,'Last name cannot exceed 50 characters.'],

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


userSchema.methods.getJWT= async function(){
    const user =  this
    const token = await jwt.sign({
        _id:this._id
    },"DEVTINDER@$474",{expiresIn:"7d"});

    return token;
}

userSchema.methods.passwordValidator= async function(passwordInputByUser){
    
    const user = this

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash) ;

    return isPasswordValid;


}

const User = mongoose.model("User", userSchema);

module.exports = User;