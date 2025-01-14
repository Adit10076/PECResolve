const express = require("express");
const router = express.Router();


const {
    getComplaints,
    createComplaints,
    deleteComplaint
} = require("../controllers/complaintController.js");
const {signup,login,getUser,updateUser}=require('../controllers/auth.js')
const{lostController}=require("../controllers/lostController.js")
const{getItems}=require("../controllers/getItems.js")
const {createMessage}=require("../controllers/contact.js")
const { findComplaintById } = require('../controllers/complaintController.js');
const{updateComplaint}=require("../controllers/complaintController.js")
const{deleteItem}=require("../controllers/getItems.js")

// Define API routes
router.post("/getuser",getUser)
router.get("/complaints", getComplaints);          
router.post("/createComplaint", createComplaints);
router.post("/signup",signup);
router.post('/login',login);
router.post("/report",lostController);
router.get("/items",getItems);
router.post("/contact",createMessage);
router.delete("/delete/:id",deleteComplaint)
router.get('/complaints/:id', findComplaintById);
router.put('/complaints/:id', updateComplaint);
router.put("/user/addcomplaint",updateUser);
router.delete("/deleteItem/:id",deleteItem);

module.exports = router;