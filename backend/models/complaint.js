const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    complaintType:{
        type:String,
        required:true,
    }
});
module.exports = mongoose.model("Complaint",complaintSchema);