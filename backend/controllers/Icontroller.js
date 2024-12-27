const LoginInstructor = require('../models/loginInstructor.js'); 
const SignupInstructor = require("../models/signInstructor.js")
const LIcontroller = async (req, res) => {
    try {
      const { firstName, password } = req.body;
  
      const newLoginInstructor = new LoginInstructor({ 
        firstName, 
        password, 
      }); 
  
      await newLoginInstructor.save();
      res.status(201).json({ message: 'Instructor registered successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering instructor' });
    }
}
module.exports=LIcontroller;

const SIcontroller = async(req,res)=>{
    try {
        const { firstName, password , instructorId} = req.body;
    
        const newSignupInstructor = new SignupInstructor({ 
          firstName, 
          password, 
          instructorId
        }); 
    
        await newSignupInstructor.save();
        res.status(201).json({ message: 'Instructor registered successfully' });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering instructor' });
      }
}
module.exports=SIcontroller;