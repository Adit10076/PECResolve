const User = require("../models/auth.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Complaint = require("../models/complaint.js")

exports.signup = async (req, res) => {
    try {
        const { userRole, firstName, password, confirmpass, studentId, instructorId } = req.body;

        // Check if passwords match
        if (password !== confirmpass) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }


        if (userRole === "Student" && !studentId) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required for role 'Student'",
            });
        }

        if (userRole === "Instructor" && !instructorId) {
            return res.status(400).json({
                success: false,
                message: "Instructor ID is required for role 'Instructor'",
            });
        }

        // Check if user already exists (by studentId or instructorId based on role)
        const isExists = await User.findOne({ firstName });
        if (isExists) {
            return res.status(400).json({
                success: false,
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
exports.login = async (req, res) => {
    try {
        // Fetch the data
        const { firstName, password, userRole } = req.body;
        let user = await User.findOne({ firstName });
        if (!user) {
            return res.json({
                success: false,
                message: "User is not registered",
            });
        }
        if (userRole !== user.userRole) {
            return res.json({
                success: false,
                message: `You need to be a ${userRole} to access ${userRole} section`,
            });
        }
        const payload = {
            firstName: user.firstName,
            id: user._id,
            userRole: user.userRole,
        };

        // Verify password and create token
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            res.json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
                instructorId: user.instructorId,
            });

        } else {
            return res.json({
                success: false,
                message: "Incorrect Password",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const assignBadge = async ( firstName ) => {
    try {
        const instructor = await User.findOne( firstName );

        if (!instructor) {
            throw new Error("Instructor not found");
        }

        let badgeType;
        if (instructor.resolvedComplaints >= 1 && instructor.resolvedComplaints <= 10) {
            badgeType = "Bronze";
        } else if (instructor.resolvedComplaints >= 11 && instructor.resolvedComplaints <= 50) {
            badgeType = "Silver";
        } else if (instructor.resolvedComplaints >= 51 && instructor.resolvedComplaints <= 100) {
            badgeType = "Gold";
        } else if (instructor.resolvedComplaints > 100) {
            badgeType = "Platinum";
        }

        // Update instructor badge if necessary
        if (instructor.badgeType !== badgeType) {
            instructor.badgeType = badgeType;
            await instructor.save();
        }
    } catch (error) {
        console.error("Error assigning badge:", error.message);
        throw error;
    }
};

exports.getUser = async (req, res) => {
    try {
        const { firstName } = req.body;

        const user = await User.findOne({ firstName });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting user"
        })
    }
}
exports.updateUser = async (req, res) => {
    const { firstName, resolvedComplaintsData } = req.body;

    try {
        const updateData = {
            $inc: {
                resolvedComplaints: 1
            },
            $push: {
                resolvedComplaintsData: resolvedComplaintsData
            }
        }

        const user = await User.findOneAndUpdate(
            { firstName },
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        try {
            await assignBadge({firstName});
        } catch (err) {
            console.error("Error during badge assignment:", err.message);
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating User", error });
    }
}