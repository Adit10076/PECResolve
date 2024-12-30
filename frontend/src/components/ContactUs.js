import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaEnvelope, FaRegEdit, FaPaperPlane } from "react-icons/fa"; // Icons
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const navigate = useNavigate()
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    // Validation
    if (name && email && subject && message) {
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          toast.success("Message sent successfully");
          setTimeout(()=>{
            navigate("/")
          },3000)
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        console.error("Error submitting complaint:", error);
        alert("Failed to submit complaint. Please try again.");
      }
    } else {
      toast.error("Please fill in all the fields.");
    }
  };

  return (
    <div>
          <Header/>
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 min-h-screen flex justify-center items-center py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg animate-slide-in">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Have a question or need support? We're here to help!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="flex items-center gap-3">
            <FaUser className="text-green-500 text-xl" />
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-green-500 text-xl" />
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
              />
            </div>
          </div>

          {/* Subject Input */}
          <div className="flex items-center gap-3">
            <FaRegEdit className="text-green-500 text-xl" />
            <div className="flex flex-col w-full">
              <label htmlFor="subject" className="text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject"
                className="bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-3">
            <FaPaperPlane className="text-green-500 text-xl" />
            <div className="flex flex-col w-full">
              <label htmlFor="message" className="text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                rows="4"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
