const mongoose = require("mongoose");

const signUpstructorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpass:{
        type:String,
        required:true
    },
    instructorId:{
        type:Number,
        required:true
    }

});
module.exports = mongoose.model("SignupInstructor",signUpstructorSchema)