const express = require("express");
const router = express.Router();

const {
    getComplaints,
    createComplaints,
} = require("../controllers/complaintController.js");
const {signup,login}=require('../controllers/auth.js')
const{lostController}=require("../controllers/lostController.js")
const{getItems}=require("../controllers/getItems.js")
const {createMessage}=require("../controllers/contact.js")

// Define API routes
router.get("/complaints", getComplaints);          
router.post("/createComplaint", createComplaints);
router.post("/signup",signup);
router.post('/login',login);
router.post("/report",lostController);
router.get("/items",getItems);
router.post("/contact",createMessage);

module.exports = router;