
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Hero = ({ isAuthenticated, setIsAuthenticated ,complaint , setComplaint}) => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-screen flex lg:flex-row flex-col items-center px-6 md:px-12 bg-gradient-to-r from-gray-800 via-black to-gray-900 overflow-hidden"
        style={{ backgroundAttachment: "fixed" }} 
      >
        {/* Left Side*/}
        <div className="flex flex-col justify-center items-start text-left text-white space-y-8 w-full md:w-2/3 lg:w-3/5 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide text-animation">
            Stay Connected, Stay Resolved
          </h1>
          <span className="text-3xl font-semibold text-greenLight text-animation">
            - The PECResolve Way!
          </span>
          <div className="w-24 md:w-32 h-1 bg-greenLight rounded-lg my-4 text-animation"></div>
          <p className="max-w-3xl text-lg md:text-xl font-light mb-6 text-animation">
            PECResolve is a digital platform designed to address and resolve grievances efficiently. Whether it's a complaint, an issue, or feedback, we ensure your voice is heard.
          </p>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center">
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <button className="bg-greenLight text-white rounded-lg py-3 px-8 hover:bg-green-600 transition-all duration-300 text-lg font-semibold transform hover:scale-105">
                Go To Dashboard
              </button>
            </Link>
            <Link to="/submitcomplaint">
              <button className="bg-lightBlue text-white rounded-lg py-3 px-8 hover:bg-blue-600 transition-all duration-300 text-lg font-semibold transform hover:scale-105">
                Submit a Complaint
              </button>
            </Link>
          </div>
          <div className="mt-10 text-white opacity-70">
            <p className="text-lg text-animation">
              Join the movement towards a safe and transparent educational environment. PECResolve is your companion for timely and transparent grievance resolution.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 lg:w-2/5 mt-10 md:mt-0 z-10 lg:block">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg h-full transform hover:scale-105 transition-all duration-500">
            <h2 className="text-3xl font-semibold text-center mb-6">Recent Complaints</h2>

            {/* Check if there are any complaints*/}
            {complaint.length === 0 ? (
              <p className="text-lg text-center font-semibold text-gray-400">No complaints yet.</p>
            ) : (
              <div className="space-y-4">
                {complaint.map((comp) => (
                  <div
                    key={comp.id}
                    className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                  >
                    <h3 className="text-2xl font-semibold">{comp.title}</h3>
                    <p className="mt-2 text-base">{comp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Hero;
