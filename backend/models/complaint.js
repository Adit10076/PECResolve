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
    }
});
module.exports = mongoose.model("Complaint",complaintSchema);