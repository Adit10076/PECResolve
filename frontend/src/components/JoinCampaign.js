import React, { useState } from "react";
import { FaUserPlus, FaEnvelope, FaExclamationCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinCampaign = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      toast.success("Your application has been submitted!");
      setFormData({ name: "", email: "", message: "" }); 
    } else {
      toast.error("Please fill all the fields before submitting.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen flex flex-col items-center py-12 px-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-green-500 mb-6 animate-slide-in">
        <FaUserPlus className="inline-block text-green-400 mr-2" /> Join the Awareness Campaign
      </h1>
      <p className="text-gray-300 text-center mb-8 max-w-xl">
        Be part of our movement to raise awareness against ragging and bullying. Your involvement can help make a
        difference. Fill out the form below to join the campaign!
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg animate-fade-in"
      >
        {/* Name Input */}
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-gray-300 mb-2">
            <FaExclamationCircle className="inline-block text-green-400 mr-2" /> Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-gray-300 mb-2">
            <FaEnvelope className="inline-block text-green-400 mr-2" /> Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col mb-4">
          <label htmlFor="message" className="text-gray-300 mb-2">
            <FaExclamationCircle className="inline-block text-green-400 mr-2" /> Why do you want to join?
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share your thoughts on why you're joining the campaign"
            className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="6"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300"
        >
          Join the Campaign
        </button>
      </form>
    </div>
  );
};

export default JoinCampaign;
