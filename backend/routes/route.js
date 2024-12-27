const express = require("express");
const router = express.Router();

//import controller
const {getComplaints} = require("../controllers/complaintController.js");
const {createComplaints} = require("../controllers/complaintController.js")
const {LScontroller}=require("../controllers/Scontroller.js")
const {SScontroller}=require("../controllers/Scontroller.js")
const {LIcontroller}=require("../controllers/Icontroller.js")
const {SIcontroller}=require("../controllers/Icontroller.js");

//define API routes
router.get("/complaints",getComplaints);
router.post("/createComplaint",createComplaints);
router.post("/signin/Student",SScontroller);
router.post("/login/Student",LScontroller);
router.post("/signin/Instructor",SIcontroller);
router.post("/login/Instructor",LIcontroller);

module.exports=router;