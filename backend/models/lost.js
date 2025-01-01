const mongoose = require("mongoose");

const lostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    firstName:{
        type:String,

    }
})

module.exports = mongoose.model("Lost",lostSchema)