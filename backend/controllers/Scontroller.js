import loginStudent from "../models/loginStudent";
import signStudent from "../models/signStudent";
const SScontroller = async(req,res)=>{
    try {
        const { firstName, password , studentId} = req.body;
    
        const newSignupStudent = new signStudent({ 
          firstName, 
          password, 
          studentId
        }); 
    
        await newSignupStudent.save();
        res.status(201).json({ message: 'Instructor registered successfully' });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering instructor' });
      }
}
module.exports=SScontroller;
const LScontroller = async(req,res)=>{
    try {
        const { firstName, password} = req.body;
    
        const newLoginStudent = new loginStudent({ 
          firstName, 
          password, 
        }); 
    
        await newLoginStudent.save();
        res.status(201).json({ message: 'Instructor registered successfully' });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering instructor' });
      }
}
module.exports=LScontroller;