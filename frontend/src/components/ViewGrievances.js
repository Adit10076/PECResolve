import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Header from "./Header.js"

const ViewGrievances = ({ name, setuserName, complaint, setComplaint , userRole,setUserRole }) => {
  const handleSubmit = async (id) => {
    try {
      //call the api
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/delete/${id}`);
      setComplaint(complaint.filter(grievance => grievance._id !== id));
      toast.success("Complaint deleted Successfully")
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const obj = JSON.parse(storedUser);
    setUserRole(obj.userRole);
    setuserName({
      firstName: obj.firstName,
      [userRole === "Student" ? "studentId" : "instructorId"]: obj.userRole === "Student" ? "studentId" : "instructorId"

    });
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/complaints`);
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        console.log(data.data);
        setComplaint(data.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen">
      <div>
        <Header/>
      </div>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-semibold text-white mb-8">View Grievances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complaint.length > 0 ? (
            complaint.map((grievance) => (
              grievance.firstName === name.firstName ? <>
                <div key={grievance._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-500">
                  <h3 className="text-2xl font-semibold mb-4">{grievance.title}</h3>
                  <p className="text-gray-400 mb-4">{grievance.description}</p>
                  <p className="text-green-500 font-bold mb-4">{grievance.complaintType}</p>
                  <button onClick={() => handleSubmit(grievance._id)} className="text-red-500 hover:underline">Delete Complaint</button><br></br><br></br>
                  
                </div>
              </> : ""
            ))
          ) : (
            <p className="text-white">No grievances to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewGrievances;
