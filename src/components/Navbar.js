
import React from "react";
import { Link } from "react-router-dom"; 
import logo from "../images/logo.jpg"; 
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated , name , setuserName , items,setItems,addItem}) => {
  const navigate = useNavigate();
  function handleLogout(){
    
    toast.warning("Logging you out...")
    setTimeout(()=>{navigate('/login')},5000)
  }
  return (
    <div className="sticky top-0 z-20 bg-white shadow-md">
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-800 py-4 backdrop-blur-lg transition-all duration-300 ease-in-out">
        <div className="container mx-auto flex justify-between items-center px-6">
          <a href="#" className="cursor-pointer">
            <img
              src={logo} 
              width="100"
              height="40"
              className="rounded-full transition-all duration-300 transform hover:scale-110"
              alt="Logo"
            />
          </a>
          <ul className="hidden lg:flex gap-12">
            <li className="cursor-pointer text-white py-2 px-4 hover:text-greenLight transition-all duration-500 relative group">
              <a href="#">Home</a>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer text-white py-2 px-4 hover:text-greenLight transition-all duration-500 relative group">
              <Link to="/lostnfound">Lost & Found</Link>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer text-white py-2 px-4 hover:text-greenLight transition-all duration-500 relative group">
              <Link to="/contact">Contact Us</Link>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer text-white py-2 px-4 hover:text-greenLight transition-all duration-500 relative group">
              <Link to="/about">About Us</Link>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
          <div className="flex gap-6">
            {/* Link to Login/Signup Page */}
            {isAuthenticated ? <>
                  <button className="bg-greenLight text-white rounded-lg py-3 px-6 hover:bg-green-600 transition duration-300 transform hover:scale-105"
                  onClick={()=>handleLogout()}>
                    Logout
                  </button>
            </> :
            
              <>
                <Link to="/login">
                  <button className="bg-greenLight text-white rounded-lg py-3 px-6 hover:bg-green-600 transition duration-300 transform hover:scale-105">
                    Log In / Sign Up
                  </button>
                </Link>
              </>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
