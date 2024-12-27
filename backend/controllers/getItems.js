const Lost = require("../models/lost.js")

exports.getItems = async(req,res)=>{
    try {
        const items = await Lost.find({});
        return res.status(200).json({
            success:true,
            items:items,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}