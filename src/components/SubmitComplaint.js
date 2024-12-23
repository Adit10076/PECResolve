import React, { use, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SubmitComplaint = ({ complaint, setComplaint, addComplaint }) => {
   
    const [formData, setformData] = useState({
        title: "",
        description: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.description) {
            addComplaint({ ...formData, id: Date.now() })
            console.log(complaint)
            toast.success("Compalint Submitted!");
            
            
        }
        else {
            toast.error("Please fill all the forms")
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Submit Your Complaint
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700 mb-2">Complaint Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter the title of your complaint"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700 mb-2">Complaint Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your complaint"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Complaint Type Selection */}
                    <div className="flex flex-col">
                        <label htmlFor="complaintType" className="text-gray-700 mb-2">Complaint Type</label>
                        <select
                            id="complaintType"
                            name="complaintType"
                            value={formData.complaintType}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="General">General</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Service">Service</option>
                            <option value="Product">Product</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Submit Complaint
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default SubmitComplaint;
