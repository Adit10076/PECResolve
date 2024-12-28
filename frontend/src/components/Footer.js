
import { Link } from "react-router-dom";
import React from "react";
import { FaHandsHelping, FaRegLightbulb } from "react-icons/fa"; 

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-5">
      <div className="container mx-auto text-center space-y-6">
        
        <div className="space-y-3">
          
          <div className="text-greenLight text-4xl mb-2">
            <FaHandsHelping className="mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-greenLight">PECResolve</h3>
          <p className="text-md font-light mt-1 opacity-80">
            Your one-stop platform for resolving student grievances.
          </p>
        </div>

        {/* Horizontal Line */}
        <div className="my-4 border-t-2 border-greenLight opacity-40 transform scale-x-0 hover:scale-x-100 transition-all duration-500 ease-in-out"></div>

        {/* Links Section */}
        <div className="flex justify-center gap-10 mt-4">
          <Link
            to="/privacy"
          >
            <span  className="text-white hover:text-lightBlue transition-all duration-300 transform hover:scale-110">Privacy Policy</span>
          </Link>
          <a
            href="#"
            className="text-white hover:text-lightBlue transition-all duration-300 transform hover:scale-110"
          >
            Terms of Service
          </a>
          <Link
            to="/contact"
            className="text-white hover:text-lightBlue transition-all duration-300 transform hover:scale-110"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-4 opacity-80">
          <p className="text-sm">© 2024 PECResolve. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
