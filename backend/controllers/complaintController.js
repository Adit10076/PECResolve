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
        const{title,description,complaintType,firstName} = req.body;
        const response = await Complaint.create({title,description,complaintType,firstName});
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

exports.deleteComplaint = async(req,res) => {
    try {
        const {id} = req.params;

        await Complaint.findByIdAndDelete(id);

        res.json({
            success:true,
            message:"Complaint DELETED",
        })
       
    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    }
}

exports.findComplaintById = async (req, res) => {
  const { id } = req.params; 

  try {

    const complaint = await Complaint.findById(id);


    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    return res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateComplaint = async(req,res)=>{
    const { id } = req.params;
    const { deadlineDate } = req.body;

    try {
        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { deadlineDate }, 
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating complaint" });
    }
}


