import React, { useState } from "react";  
import { Link } from "react-router-dom";  
import { useNavigate } from "react-router-dom";  
import { RxHamburgerMenu } from "react-icons/rx";  
import { ToastContainer, toast } from "react-toastify";  

const Header = ({ isAuthenticated, setIsAuthenticated }) => {  
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();  

  function handleLogout() {  
    toast.warning("Logging you out...");  
    localStorage.removeItem("authToken");  
    localStorage.removeItem("user");  
    setTimeout(() => {  
      navigate("/login");  
    }, 1000);  
  }  

  return (  
    <div className="sticky top-0 z-20">  
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-800 py-2 px-6 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out">  
        <div className="container mx-auto flex justify-between items-center">  
          <div className="lg:hidden flex items-center">  
            <button  
              onClick={() => setIsOpen(!isOpen)}  
              className="text-white focus:outline-none text-[24px]"  
            >  
              <RxHamburgerMenu />  
            </button>  
          </div>  
          <ul  
            className={`lg:flex gap-8 ${isOpen  
              ? "flex-col absolute top-12 left-10 bg-white bg-opacity-80 border border-gray-500 w-[150px] rounded-lg px-6 py-4 shadow-lg"  
              : "hidden lg:flex"}`}  
          >  
            <li className="cursor-pointer lg:text-white text-black py-2 px-3 hover:text-greenLight transition-all duration-300 relative group">  
              <Link to="/">Home</Link>  
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>  
            </li>  
            <li className="cursor-pointer lg:text-white text-black py-2 px-3 hover:text-greenLight transition-all duration-300 relative group">  
              <Link to="/lostnfound">Lost & Found</Link>  
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>  
            </li>  
            <li className="cursor-pointer lg:text-white text-black py-2 px-3 hover:text-greenLight transition-all duration-300 relative group">  
              <Link to="/contact">Contact Us</Link>  
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>  
            </li>  
            <li className="cursor-pointer lg:text-white text-black py-2 px-3 hover:text-greenLight transition-all duration-300 relative group">  
              <Link to="/about">About Us</Link>  
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-greenLight transition-all duration-300 group-hover:w-full"></span>  
            </li>  
          </ul>  
        </div>  
      </nav>  
    </div>  
  );  
};  

export default Header;  
