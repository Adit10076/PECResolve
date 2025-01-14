const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    userRole:{
        type:String,
        required:true,
        enum:["Student","Instructor"]
    },
    password:{
        type:String,
        required:true,
    },
    confirmpass:{
        type:String,
    
    },
    studentId:{
        type:String,
        default:null
        
    },
    instructorId:{
        type:String,
        default:null   
    },
    resolvedComplaints: {
        type: Number,
        default: 0,
    },
    badgeType: {
        type: String,
        enum: ["Bronze", "Silver", "Gold", "Platinum"],
        default: "Bronze",
    },
    resolvedComplaintsData:[{
        type:"String",
        default:null
    }]

    
});

module.exports = mongoose.model("User",authSchema);