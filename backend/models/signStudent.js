const mongoose = require("mongoose");

const signStudentSchema = new mongoose.Schema({
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
    studentId:{
        type:Number,
        required:true
    }

});
module.exports = mongoose.model("SignupStudent",signStudentSchema)