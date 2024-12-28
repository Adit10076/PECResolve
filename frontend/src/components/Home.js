
import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import AntiRagging from "./AntiRagging";
import FAQ from './FAQ'

const Home = ({isAuthenticated,setIsAuthenticated ,name , setuserName , complaint , setComplaint,userRole}) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}/>

      {/* Hero Section */}
      <Hero isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} complaint={complaint} setComplaint={setComplaint} userRole={userRole}/>

      {/* Anti Ragging  */}

      <AntiRagging/>

      {/* FAQ  */}

      <FAQ/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
