

import React, { use, useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaClipboardList, FaChalkboardTeacher, FaSchool } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import InstructorDashboard from "../components/InstructorDashboard"
import Header from "./Header"

const Dashboard = ({isAuthenticated,setIsAuthenticated,name,setuserName,userRole,setUserRole,complaint}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken")
    setIsAuthenticated(false);
    navigate("/");
  };
  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    const obj = JSON.parse(storedUser);
    setUserRole(obj.userRole);
    setuserName({
      firstName:obj.firstName,
      [userRole === "Student" ? "studentId" : "instructorId"]: obj.userRole === "Student" ? "studentId" : "instructorId"

    });
    console.log(name);
    console.log(userRole);
  },[])
  return (

   <div>
    <Header/>
     <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto max-w-4xl text-center space-y-8">
        {/* Dashboard Header */}
        <h2 className="text-4xl font-semibold">Welcome to your Dashboard</h2>

        {/* Greeting */}
        <div className="flex justify-center items-center space-x-4">
          <FaUser className="text-3xl" />
          <h3 className="text-2xl">
            Hello, {name.firstName} !
          </h3>
        </div>

        {/*Content */}
        <div className="mt-6">
          {userRole === "Student" ? (
            <div>
              <p className="text-lg">As a student, you can manage your grievances here.</p>
              <div className="mt-4 flex justify-center space-x-6">
                <div className="bg-gray-700 p-6 rounded-md shadow-lg w-48">
                  <FaClipboardList className="text-3xl mb-4" />
                  <button onClick={()=>navigate("/view")}>View Grievances</button>
                </div>
                <div className="bg-gray-700 p-6 rounded-md shadow-lg w-48">
                  <FaSchool className="text-3xl mb-4" />
                  <button onClick={()=>navigate("/submitcomplaint")}>Submit New Grievance</button>
                </div>
              </div>
            </div>
          ) : (
            <InstructorDashboard complaint={complaint}/>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-500 transition duration-300"
          >
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Dashboard;
