const Lost = require("../models/lost.js")

exports.lostController = async(req,res)=>{
    try {
        const {title,description,type}=req.body;
        const item = await Lost.create({title,description,type});
        return res.status(200).json({
            success:true,
            data:item,
            message:"item added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
