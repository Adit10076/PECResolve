const mongoose = require("mongoose");

const loginStudentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model("LoginStudent",loginStudentSchema)