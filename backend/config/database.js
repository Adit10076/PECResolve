const mongoose = require("mongoose");
require("dotenv").config()
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((e)=>{
        console.log("database connection unsuccessfull");
    })
};

module.exports=dbConnect;