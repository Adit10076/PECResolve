const express = require("express");
const router = express.Router();

const {
    getComplaints,
    createComplaints,
} = require("../controllers/complaintController.js");
const {signup,login}=require('../controllers/auth.js')

// Define API routes
router.get("/complaints", getComplaints);          
router.post("/createComplaint", createComplaints);
router.post("/signup",signup);
router.post('/login',login);

module.exports = router;