
import React from "react";
import { FaBullhorn, FaShieldAlt } from "react-icons/fa"; 
import { ToastContainer,toast } from "react-toastify";
import antiRagging from '../images/Anti-Ragging.webp'
import { Link } from "react-router-dom";
import Header from './Header'

const AntiRagging = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20">
      <div>

      </div>
      <div className="container mx-auto text-center space-y-10">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold text-white">
          Anti Ragging Awareness
        </h2>
        <p className="text-lg font-medium text-white max-w-2xl mx-auto">
          Our mission is to eliminate ragging and provide a safe and inclusive environment for all students at PEC. Join us in standing against ragging!
        </p>

        {/* Image and Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-5">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={antiRagging} 
              alt="Anti Ragging"
              className="rounded-lg shadow-lg w-full md:w-3/4"
            />
          </div>

          {/* Information Section */}
          <div className="flex flex-col justify-center items-start space-y-6 text-white">
            <div className="flex items-center space-x-3">
              <FaBullhorn className="text-3xl" />
              <h3 className="text-xl font-semibold">What is Ragging?</h3>
            </div>
            <p className="text-lg">
              Ragging is any form of harassment, humiliation, or bullying that takes place within educational institutions. It can cause emotional and physical harm to students and should be stopped immediately.
            </p>

            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-3xl" />
              <h3 className="text-xl font-semibold">How We Fight Against It</h3>
            </div>
            <p className="text-lg">
              We provide a strict anti-ragging policy that enforces consequences for those involved in ragging. Additionally, we encourage students to report any incidents in complete confidentiality to ensure a safe learning environment for all.
            </p>

            <div className="flex justify-center gap-4">
              <Link to="/complaint">
                <button className="bg-lightBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300">
                  Report an Incident
                </button>
              </Link>
              <Link to="/join" >
                <button className="bg-lightBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300">
                  Join Awareness Campaign
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiRagging;
