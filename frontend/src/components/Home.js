
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import AntiRagging from "./AntiRagging";
import FAQ from './FAQ'

const Home = ({isAuthenticated,setIsAuthenticated ,name , setuserName , complaint , setComplaint,userRole,setUserRole}) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} name={name} setuserName={setuserName}/>

      {/* Hero Section */}
      <Hero isAuthenticated={isAuthenticated} complaint={complaint} userRole={userRole} setUserRole={setUserRole} name={name} setuserName={setuserName}/>

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
