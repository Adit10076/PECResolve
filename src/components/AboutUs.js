import React from "react";
import { FaGlobe, FaUsers, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 min-h-screen flex flex-col items-center py-12 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
          About Us
        </h1>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          Welcome to <span className="text-green-400 font-semibold">PECResolve</span>, 
          Here , we are committed to fostering a harmonious and well-connected campus environment at PEC Chandigarh. 
          Our platform serves as a centralized hub where students, faculty, and staff can report, manage, 
          and resolve issues efficiently. Whether it's submitting complaints, tracking lost and found items, 
          or seeking quick solutions, PEC Resolve is designed to empower our community with transparency and 
          accountability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-slide-up">
          {/* Our Mission */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaRocket className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-400">
            To empower the PEC community by providing a transparent, efficient, and collaborative platform for 
            resolving issues, fostering trust, and enhancing campus harmony.
            </p>
          </div>

          {/* Our Team */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaUsers className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Team</h3>
            <p className="text-gray-400">
            A dedicated group of PEC students working together to create a seamless problem-resolution 
            platform, driven by innovation, integrity, and collaboration.
            </p>
          </div>

          {/* Our Vision */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaGlobe className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-400">
            Together, we envision a campus where every voice is heard, every problem finds a resolution, 
            and everyone feels valued.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-4 animate-slide-up">
            Want to Learn More?
          </h2>
          <p className="text-gray-400 mb-8 animate-slide-up">
            Join us on this journey and discover how we can make a difference together.
          </p>
          <Link to = "/contact" >
          <button className="bg-green-500 text-white py-3 px-8 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105">
            Contact Us
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
