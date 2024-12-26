const express = require("express");
const router = express.Router();

//import controller
const {getComplaints} = require("../controllers/complaintController.js");
const {createComplaints} = require("../controllers/complaintController.js")

//define API routes
router.get("/complaints",getComplaints);
router.post("/createComplaint",createComplaints);

module.exports=router;