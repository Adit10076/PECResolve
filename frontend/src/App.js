

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
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import ResolveComplaint from "./components/ResolveComplaint.js";
import ViewItems from "./components/ViewItems.js";

const App = () => {
  const [userRole, setUserRole] = useState("Student");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setuserName] = useState({
    firstName: "",
    [userRole === "Student" ? "studentId" : "instructorId"]: ""
  });
  // user authentication status
  useEffect(() => {
    const loggedIn = localStorage.getItem("authToken");
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

  function addComplaint(newComplaint) {
    setComplaint([...complaint, newComplaint]);
  }

  return (
    <Router>
      <Routes>
        {/* Home Page Default route */}
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}
          complaint={complaint} setComplaint={setComplaint} userRole={userRole} setUserRole={setUserRole} />} />
        {/* Lost n found route */}
        <Route path='/lostnfound' element={<LostAndFound name={name} setuserName={setuserName} items={items} setItems={setItems} addItem={addItem} />} />
        {/* Login/Signup Page*/}
        <Route path="/login" element={<LoginSignup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}
          userRole={userRole} setUserRole={setUserRole} />} />
        {/* To submit a complaint */}
        <Route path="/submitcomplaint" element={<SubmitComplaint userRole={userRole} name={name} setuserName={setuserName} isAuthenticated={isAuthenticated} complaint={complaint} setComplaint={setComplaint} addComplaint={addComplaint} />} />
        {/* Dashboard  */}
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
          name={name} setuserName={setuserName} userRole={userRole} setUserRole={setUserRole} complaint={complaint} />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/complaint' element={<AntiRaggingComplaint />} />
        <Route path='/join' element={<JoinCampaign />} />
        <Route path='/view' element={<ViewGrievances name={name} setuserName={setuserName} complaint={complaint} setComplaint={setComplaint} userRole={userRole} setUserRole={setUserRole} />} />
        <Route path="/resolve-complaint/:complaintId" element={<ResolveComplaint />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path ='/lostnfound/view' element={<ViewItems name={name} setuserName={setuserName} items={items} setItems={setItems}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
