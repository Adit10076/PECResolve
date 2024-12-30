import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify"
import Header from "./Header"

const ResolveComplaint = () => {
    const complaintId = useParams(); // Returns an object
    const [complaint, setComplaint] = useState(null);
    const [fine, setFine] = useState(0);
    const [newDeadline, setNewDeadline] = useState("");
    // const [isFinePaid , setIsFinePaid]=useState(false);

    // Effect to handle fine calculation and deadline notifications
    const removeSet = ()=>{
        if (complaint && complaint.deadlineDate) {
            const deadline = new Date(complaint.deadlineDate);
            const currentDate = Date.now();
            const timeDiff = deadline - currentDate;
            const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

            // Apply fine if deadline is passed
            if (dayDiff < 0) {
                const overdueDays = Math.abs(dayDiff);
                const overdueFine = overdueDays * 50;
                setFine(overdueFine);
            }

            // Show notification when 1 day is left
            if (dayDiff === 1) {
                toast.warning("You are 1 day away from the deadline to resolve this complaint!");
                
            }
        }
    }

    // Fetch complaint data
    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/complaints/${complaintId.complaintId}`);
                console.log(response.data)
                setComplaint(response.data);
            } catch (error) {
                console.error("Error fetching complaint details", error);
            }
        };
        fetchComplaint();
        removeSet();
    }, [complaintId]);

    // Handle the new deadline input change
    const handleDeadlineChange = (e) => {
        setNewDeadline(e.target.value);
    };

    // Handle the setting of the new deadline
    const setDeadline = async () => {
        if (newDeadline) {
            // Update the deadline in the backend
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/v1/complaints/${complaintId.complaintId}`,
                    { deadlineDate: newDeadline }
                );
                toast.success("Deadline set successfully!");
                setComplaint(response.data);
                
            } catch (error) {
                console.error("Error setting deadline", error);
            }
        }
    };

    // Handle complaint resolution
    const resolveComplaint = async () => {
        try {
            //pay the fine
            //notify the user
            toast.success("Complaint resolved successfully!");
            setFine(0); // Reset fine when complaint is resolved
            //delete complaint
            try{
                //call the api
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/delete/${complaintId.complaintId}`);
              }
              catch(error){
                toast.error(error.message);
              }
        } catch (error) {
            console.error("Error resolving complaint", error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <Header/>
            {complaint ? (
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-semibold mb-6">Resolve Complaint</h2>
                    <div className="bg-gray-700 p-6 rounded-md shadow-lg space-y-4">
                        <p><strong>Title:</strong> {complaint.title}</p>
                        <p><strong>Description:</strong> {complaint.description}</p>
                        <p><strong>Complaint Type:</strong> {complaint.complaintType}</p>
                        <p><strong>Current Deadline:</strong> {new Date(complaint.deadlineDate).toLocaleDateString()}</p>

                        {/* Fine Information */}
                         
                            <div className="mt-4 text-red-500">
                                <p><strong>Fine Applied:</strong> Rs. {fine}</p>
                            </div>
                        

                        {/* Form for setting a new deadline */}
                        <div className="mt-4">
                            <label className="block text-lg">Set New Deadline:</label>
                            <input
                                type="date"
                                value={newDeadline}
                                onChange={handleDeadlineChange}
                                className="mt-2 p-2 rounded-md text-black"
                                
                            />
                        </div>

                        {/* Set Deadline Button */}
                        {console.log(complaint.deadlineDate)}
                        {!complaint.deadlineDate &&  (
                            <button
                                onClick={setDeadline}
                                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-300 mt-4 mr-5"
                            >
                                Set Deadline
                            </button>
                        )}

                        {/* Button to mark complaint as resolved */}
                        <button
                            onClick={resolveComplaint}
                            className="bg-greenLight text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300 mt-4"
                        >
                            Mark as Resolved
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading complaint details...</p>
            )}
            <ToastContainer/>
        </div>
    );
};

export default ResolveComplaint;
