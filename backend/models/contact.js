const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")
const {createThankYouEmail} = require("../utils/mailTemplate")

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

//pre save send mail

async function sendEmail(email,name) {
	try {
		const mailResponse = await mailSender(
            email,
            "PECRESOLVE||FORM RECIEVED",
            createThankYouEmail(name)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
contactSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	await sendEmail(this.email, this.name);
	next();
});


module.exports = mongoose.model("Contact",contactSchema)