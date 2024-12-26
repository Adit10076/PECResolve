const Complaint = require("../models/complaint.js")

exports.getComplaints = async(req,res)=>{
    try{
        //fetch all items
        const complaints = await Complaint.find({});
        res.status(200).json({
            success:true,
            data:complaints,
            message:"All complaints fetched"
        })
    }
    catch(e){
        console.log("error fetching complaints")
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
};
exports.createComplaints = async(req,res)=>{
    try{
        const{title,description,complaintType} = req.body;
        const response = await Complaint.create({title,description,complaintType});
        res.status(200).json({
            success:true,
            data:response
        })
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}