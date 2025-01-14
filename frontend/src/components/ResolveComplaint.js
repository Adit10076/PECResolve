import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "./Header";

const ResolveComplaint = ({ name, setuserName }) => {
    const { complaintId } = useParams(); // Extract complaintId correctly
    const [complaint, setComplaint] = useState(null);
    const [fine, setFine] = useState(0);
    const [newDeadline, setNewDeadline] = useState("");
    const [userId, setUserId] = useState("");
    const [showButton, setShowButton] = useState(false);

    // Effect to handle setting user data once
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const obj = JSON.parse(storedUser);
        setUserId(obj._id);
        const instructorId = localStorage.getItem('instructorId');
        setuserName({
            firstName: obj.firstName,
            instructorId: instructorId
        });
    }, []); // Run once when the component mounts

    // Effect to fetch complaint data
    useEffect(() => {
          
        const fetchComplaint = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/complaints/${complaintId}`);
                setComplaint(response.data);
            } catch (error) {
                console.error("Error fetching complaint details", error);
            }
        };
        fetchComplaint();
    }, [complaintId]);

    // Effect to handle fine calculation and deadline notifications
    useEffect(() => {
        if (complaint && complaint.deadlineDate) {
            const deadline = new Date(complaint.deadlineDate);
            const currentDate = Date.now();
            const timeDiff = deadline - currentDate;
            const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

            if (dayDiff < 0) {
                const overdueDays = Math.abs(dayDiff);
                const overdueFine = overdueDays * 50;
                setFine(overdueFine);
            }

            if (dayDiff === 1) {
                toast.warning("You are 1 day away from the deadline to resolve this complaint!");
            }
        }
    }, [complaint]); // Only run this effect when `complaint` is updated

    // Handle the setting of a new deadline
    const handleDeadlineChange = (e) => {
        setNewDeadline(e.target.value);
    };

    const setDeadline = async () => {
        setShowButton(true)
        if (newDeadline) {
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/v1/complaints/${complaintId}`,
                    { deadlineDate: newDeadline }
                );
                toast.success("Deadline set successfully!");
                setComplaint(response.data);
            } catch (error) {
                toast.error("Error setting deadline");
            }
        }
    };

    // Handle complaint resolution
    const resolveComplaint = async () => {
        try {
            toast.success("Complaint resolved successfully!");
            setFine(0); // Reset fine when complaint is resolved

            // Add instructor to resolvedBy section
            try {
                await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/v1/user/addcomplaint`,
                    { firstName: name.firstName, resolvedComplaintsData: complaint.title }
                );
            } catch (error) {
                console.error("Error adding complaint to user", error.message);
            }

            // Mark complaint as resolved
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/v1/complaints/${complaintId}`,
                    { resolved: true, resolvedBy: userId }
                );
                setComplaint(response.data);
            } catch (error) {
                console.log("Error updating complaint status", error.message);
            }

            // Delete complaint
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/delete/${complaintId}`);
            } catch (error) {
                toast.error("Error deleting complaint");
            }
        } catch (error) {
            toast.error("Error resolving complaint");
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <Header />
            {complaint ? (
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-semibold mb-6">Resolve Complaint</h2>
                    <div className="bg-gray-700 p-6 rounded-md shadow-lg space-y-4">
                        <p><strong>Title:</strong> {complaint.title}</p>
                        <p><strong>Description:</strong> {complaint.description}</p>
                        <p><strong>Complaint Type:</strong> {complaint.complaintType}</p>
                        <p><strong>Current Deadline:</strong> {complaint.deadlineDate ? new Date(complaint.deadlineDate).toLocaleDateString() : "Not set"}</p>

                        <div className="mt-4 text-red-500">
                            <p><strong>Fine Applied:</strong> Rs. {fine}</p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-lg">Set New Deadline:</label>
                            <input
                                type="date"
                                value={newDeadline}
                                onChange={handleDeadlineChange}
                                className="mt-2 p-2 rounded-md text-black"
                            />
                        </div>

                        {!complaint.deadlineDate && (
                            <button
                                onClick={setDeadline}
                                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-300 mt-4 mr-5"
                            >
                                Set Deadline
                            </button>
                        )}
                        {
                            showButton ? <>
                                <button
                                    onClick={resolveComplaint}
                                    className="bg-greenLight text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300 mt-4"
                                >
                                    Mark as Resolved
                                </button>
                            </> : ""
                        }

                    </div>
                </div>
            ) : (
                <p>Loading complaint details...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default ResolveComplaint;
