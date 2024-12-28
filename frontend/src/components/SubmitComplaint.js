import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SubmitComplaint = ({ complaint, setComplaint, addComplaint, isAuthenticated }) => {
    const [formData, setformData] = useState({
        title: "",
        description: "",
        complaintType: "General"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.title && formData.description) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/createComplaint`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });
                if (response.ok) {
                    const data = await response.json();
                    addComplaint({ ...formData, id: Date.now() });
                    toast.success("Complaint Submitted!");
                    navigate("/");
                } else {
                    throw new Error("Failed to submit complaint");
                }
            } catch (error) {
                console.error("Error submitting complaint:", error);
                alert("Failed to submit complaint. Please try again.");
            }
        } else {
            toast.error("Please fill all the forms");
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <div className="bg-gradient-to-br from-black via-green-900 to-gray-900 min-h-screen flex justify-center items-center py-12">
                        <div className="bg-gradient-to-t from-gray-800 via-green-800 to-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <h2 className="text-3xl font-bold text-center text-green-300 mb-6 tracking-wide">
                                Submit Your Complaint
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col">
                                    <label htmlFor="title" className="text-green-300 mb-2">Complaint Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter the title of your complaint"
                                        className="border border-green-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="text-green-300 mb-2">Complaint Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your complaint"
                                        className="border border-green-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-green-500"
                                        rows="4"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="complaintType" className="text-green-300 mb-2">Complaint Type</label>
                                    <select
                                        id="complaintType"
                                        name="complaintType"
                                        value={formData.complaintType}
                                        onChange={handleChange}
                                        className="border border-green-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-green-500"
                                    >
                                        <option value="General">General</option>
                                        <option value="Urgent">Urgent</option>
                                        <option value="Campus">Campus</option>
                                        <option value="Hostel">Hostel</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-700 text-white py-3 rounded-md hover:bg-gradient-to-l hover:from-green-700 hover:to-green-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400"
                                >
                                    Submit Complaint
                                </button>
                            </form>
                        </div>
                        <ToastContainer />
                    </div>
                </>
            ) : navigate("/login")}
        </div>
    );
};

export default SubmitComplaint;
