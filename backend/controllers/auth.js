const User = require("../models/auth.js");
const bcrypt = require("bcrypt");
jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { userRole, firstName, password, confirmpass, studentId, instructorId } = req.body;

        // Check if passwords match
        if (password !== confirmpass) {
            return res.status(400).json({
                success:false,
                message: "Passwords do not match",
            });
        }
        

        if (userRole === "Student" && !studentId) {
            return res.status(400).json({
                success:false,
                message: "Student ID is required for role 'Student'",
            });
        }

        if (userRole === "Instructor" && !instructorId) {
            return res.status(400).json({
                success:false,
                message: "Instructor ID is required for role 'Instructor'",
            });
        }

        // Check if user already exists (by studentId or instructorId based on role)
        const userId = userRole === "Student" ? studentId : instructorId;
        const isExists = await User.findOne({ userId });
        if (isExists) {
            return res.status(400).json({
                success:false,
                message: "User already exists",
            });
        }

        // Secure the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            firstName,
            userRole,
            password: hashedPassword,
            confirmpass: hashedPassword,
            studentId: userRole === "Student" ? studentId : null, 
            instructorId: userRole === "Instructor" ? instructorId : null,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//login
exports.login = async(req,res)=>{
    try {
        //fetch the data
        const{firstName,password,userRole}=req.body;
        let user = await User.findOne({firstName}).lean();
        if(!user){
            return res.json({
                success:false,
                message:"User is not registered"
            })
        }
        const payload={
            firstName:user.firstName,
            id:user._id,
            userRole:user.userRole
        }
        //verify and create token
        if(await bcrypt.compare(password,user.password)){
            //passwords match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            res.json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
                instructorId:user.instructorId,

            })
        }
        else{
            //passwords do not match
            return res.json({
                success:false,
                message:"Incorrect Password"
            })
        }

    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        });
    }
}