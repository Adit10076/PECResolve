const Contact = require("../models/contact");

exports.createMessage = async(req,res)=>{
    try {
        const {name,email,subject,message} = req.body;
        const msg = await Contact.create({name,email,subject,message});
        return res.status(200).json({
            sucess:true,
            data:msg,
            message:"Message Sent Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
