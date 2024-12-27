const mongoose = require("mongoose");

const loginInstructorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

});
module.exports = mongoose.model("LoginInstructor",loginInstructorSchema)