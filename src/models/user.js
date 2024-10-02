
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: 'string',

    },
    lastName :{
        type: 'string',

    },
    emailId:{
        type: 'string',
    },
    password: {
        type: 'string',
    },
    age:{
        type:'Number',
    },
    gender:{
    type:'string',
}
})

const User = mongoose.model("User", userSchema);

module.exports = User;