

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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setuserName] = useState({ firstName: '' });

  // user authentication status
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const [items, setItems] = useState([
    { id: 1, 
      title: "Lost Phone", 
      description: "I lost my phone in the library.", 
      type: "lost" },
    { id: 2, 
      title: "Found Wallet", 
      description: "A wallet was found near the cafeteria.", 
      type: "found" }
  ]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const [complaint, setComplaint] = useState([
      { id: 1, title: "Complaint about server downtime", description: "The server was down for hours yesterday." },
      { id: 2, title: "Complaint about faculty behavior", description: "The professor was rude during the class." },
  ]);

  function addComplaint(newComplaint){
    setComplaint([...complaint,newComplaint]);
  }
  const [userRole, setUserRole] = useState("student");
  return (
    <Router>
      <Routes>
        {/* Home Page Default route */}
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}
        complaint={complaint} setComplaint={setComplaint}/>}/>
        {/* Lost n found route */}
        <Route path='/lostnfound' element={<LostAndFound items={items} setItems={setItems} addItem={addItem}/>}/>
        {/* Login/Signup Page If not logged in */}
        <Route path="/login" element={<LoginSignup  isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}
        userRole={userRole} setUserRole={setUserRole}/>} />
        {/* To submit a complaint */}
        <Route path="/submitcomplaint" element={<SubmitComplaint complaint={complaint} setComplaint={setComplaint} addComplaint={addComplaint}/>} />
        {/* Dashboard  */}
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole}
        setUserRole={setUserRole}/>} />
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/complaint' element={<AntiRaggingComplaint/>}/>
        <Route path='/join' element={<JoinCampaign/>}/>
      </Routes>
    </Router>
  );
};

export default App;
