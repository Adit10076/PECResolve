// src/components/Home.js

import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import AntiRagging from "./AntiRagging";

const Home = ({isAuthenticated,setIsAuthenticated ,name , setuserName , complaint , setComplaint}) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}/>

      {/* Hero Section */}
      <Hero isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} complaint={complaint} setComplaint={setComplaint}/>

      {/* Anti Ragging  */}

      <AntiRagging/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
