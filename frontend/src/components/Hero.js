
import { Link } from 'react-router-dom'
import React from "react";

const Hero = ({ isAuthenticated, setIsAuthenticated, complaint, setComplaint ,userRole}) => {
  return (
    <div>
      <div
        className="relative pt-4 bg-cover bg-center pb-6 h-fit flex lg:flex-row flex-col items-center px-6 md:px-12 bg-gradient-to-r from-gray-800 via-black to-gray-900 overflow-hidden"

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
            {
              userRole==="Student"?<>
                <Link to="/submitcomplaint">
              <button className="bg-lightBlue text-white rounded-lg py-3 px-8 hover:bg-blue-600 transition-all duration-300 text-lg font-semibold transform hover:scale-105">
                Submit a Complaint
              </button>
            </Link>
              </>:<button></button>
            }
          </div>
          <div className="mt-10 text-white opacity-70">
            <p className="text-lg text-animation">
              Join the movement towards a safe and transparent educational environment. PECResolve is your companion for timely and transparent grievance resolution.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 lg:w-2/5 mt-10 md:mt-0 z-10 lg:block">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-90 text-white p-8 rounded-lg shadow-2xl h-full transform hover:scale-105 transition-all duration-500 ease-in-out">
            <h2 className="text-4xl font-bold text-center mb-6 text-green-300 tracking-wider">
              Recent Complaints
            </h2>

            <div className="space-y-6 max-h-[400px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {complaint.length === 0 ? (
                <p className="text-lg text-center font-semibold text-gray-400">
                  No complaints yet.
                </p>
              ) : (
                complaint.map((comp) => {
                  const complaintTypeColors = {
                    General: "border-green-400 bg-green-900/50",
                    Urgent: "border-red-500 bg-red-900/50",
                    Hostel: "border-blue-400 bg-blue-900/50",
                    Campus: "border-yellow-500 bg-yellow-900/50",
                  };

                  const complaintClass =
                    complaintTypeColors[comp.complaintType];

                  return (
                    <div
                      className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 ${complaintClass}`}
                    >
                      <h3 className="text-2xl font-semibold mb-2 text-green-200">
                        {comp.title}
                      </h3>
                      <p className="text-base text-gray-300">{comp.description}</p>
                      <p
                        className={`mt-2 text-sm font-bold ${comp.complaintType === "Urgent"
                            ? "text-red-400"
                            : "text-green-300"
                          }`}
                      >
                        {comp.complaintType}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Hero;
