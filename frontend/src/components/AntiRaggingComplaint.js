import React, { useState } from "react";
import { FaBullhorn, FaPen, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AntiRaggingComplaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
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
    if (formData.name && formData.email && formData.complaint) {
      toast.success("Your complaint has been submitted. We will address it shortly.");
      setFormData({ name: "", email: "", complaint: "" });
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen flex flex-col items-center py-12 px-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-green-500 mb-6 animate-slide-in">
        <FaBullhorn className="inline-block text-green-400 mr-2" /> Anti-Ragging Complaint
      </h1>
      <p className="text-gray-300 text-center mb-8 max-w-xl">
        We are committed to ensuring a safe and inclusive environment at PEC. If you encounter or witness any
        incidents of ragging, please report them here. Your identity will remain confidential, and action will
        be taken promptly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg animate-fade-in"
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-gray-300 mb-2">
            <FaPen className="inline-block text-green-400 mr-2" /> Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-gray-300 mb-2">
            <FaPaperPlane className="inline-block text-green-400 mr-2" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="complaint" className="text-gray-300 mb-2">
            <FaPen className="inline-block text-green-400 mr-2" /> Complaint
          </label>
          <textarea
            id="complaint"
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            placeholder="Describe the incident"
            className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="6"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default AntiRaggingComplaint;
