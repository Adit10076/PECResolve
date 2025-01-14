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
    },
    firstName:{
        type:String
    },
    instructorType:{
        type:String,
        enum:["General","Hostel","Campus","Urgent"]
    },
    deadlineDate:{
        type:Date,
    },
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    resolved: {
        type: Boolean,
        default: false,
    },

});
module.exports = mongoose.model("Complaint",complaintSchema);