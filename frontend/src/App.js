

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";  
import Dashboard from "./components/Dashboard"; 
import LoginSignup from "./components/LoginSignup"; 
import LostAndFound from "./components/LostAndFound";
import SubmitComplaint from './components/SubmitComplaint.js'
import ContactUs from "./components/ContactUs.js";
import AboutUs from "./components/AboutUs.js";
import AntiRaggingComplaint from "./components/AntiRaggingComplaint.js";
import JoinCampaign from "./components/JoinCampaign.js";
import ViewGrievances from "./components/ViewGrievances.js";

const App = () => {
  const [userRole, setUserRole] = useState("Student");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setuserName] = useState({
    firstName: "",
    [userRole === "Student" ? "studentId" : "instructorId"]: "" 
  });
  // user authentication status
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  //get all complaints from database

  const [items, setItems] = useState([
  ]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const [complaint, setComplaint] = useState([ 
      // { id: 1, title: "Complaint about server downtime", description: "The server was down for hours yesterday." },
      // { id: 2, title: "Complaint about faculty behavior", description: "The professor was rude during the class." },
  ]);

  useEffect(() => {
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

  function addComplaint(newComplaint){
    setComplaint([...complaint,newComplaint]);
  }
  return (
    <Router>
      <Routes>
        {/* Home Page Default route */}
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}
        complaint={complaint} setComplaint={setComplaint}/>}/>
        {/* Lost n found route */}
        <Route path='/lostnfound' element={<LostAndFound items={items} setItems={setItems} addItem={addItem}/>}/>
        {/* Login/Signup Page*/}
        <Route path="/login" element={<LoginSignup  isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}
        userRole={userRole} setUserRole={setUserRole}/>} />
        {/* To submit a complaint */}
        <Route path="/submitcomplaint" element={<SubmitComplaint isAuthenticated={isAuthenticated} complaint={complaint} setComplaint={setComplaint} addComplaint={addComplaint}/>} />
        {/* Dashboard  */}
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} 
        name={name} setuserName={setuserName} userRole={userRole}
        setUserRole={setUserRole}/>} />
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/complaint' element={<AntiRaggingComplaint/>}/>
        <Route path='/join' element={<JoinCampaign/>}/>
        <Route path ='/view' element={<ViewGrievances/>}/>
      </Routes>
    </Router>
  );
};

export default App;
