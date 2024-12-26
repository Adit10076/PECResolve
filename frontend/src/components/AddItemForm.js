// src/components/AddItemForm.js
import React, { useState } from "react";
import { ToastContainer,toast } from "react-toastify";

const AddItemForm = ({ items, setItems, addItem }) => { //for the list

    //for the form 
    const [formData , setformData] = useState({
        title:"",
        description:"",
        type:"lost"
    })
    const handleChange = (e) => {
        const { name , value } = e.target;
        setformData((prevState) => ({ ...prevState, [name]: value }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.description) {
            addItem({ ...formData, id: Date.now() });
            toast.success("Added Item Successfully");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-3xl font-semibold text-center text-white mb-6">Report a Lost or Found Item</h2>

            <div className="mb-4">
                <label htmlFor="title" className="text-white text-lg">Item Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white p-2 rounded-md mt-2"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="text-white text-lg">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-gray-700 text-white p-2 rounded-md mt-2"
                />
            </div>

            <div className="mb-6">
                <label className="text-white text-lg">Type</label>
                <div className="flex gap-6 mt-2">
                    <label className="text-white">
                        <input
                            type="radio"
                            name="type"
                            value="lost"
                            checked={formData.type === "lost"}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Lost
                    </label>
                    <label className="text-white">
                        <input
                            type="radio"
                            name="type"
                            value="found"
                            checked={formData.type === "found"}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Found
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-greenLight text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300"
            >
                Report Item
            </button>
        </form>
    );
};

export default AddItemForm;
