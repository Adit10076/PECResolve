import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaSchool, FaChalkboardTeacher } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = ({ isAuthenticated, setIsAuthenticated, name, setuserName, userRole, setUserRole }) => {
  const navigate = useNavigate();
  const [pass, setPass] = useState({
    password: "",
    confirmpass: ""
  });


  
  useEffect(() => {
    if (userRole === "Student") {
      setuserName((prev) => ({
        ...prev,
        studentId: "", 
      }));
    } else if (userRole === "Instructor") {
      setuserName((prev) => ({
        ...prev,
        instructorId: "",
      }))
    }
  }, [userRole, setuserName]);

  const toggleForm = () => setIsAuthenticated(!isAuthenticated);
  const toggleRole = (role) => setUserRole(role); 

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setuserName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPass((prev) => ({
      ...prev,
      [name]: value
    }));
    //navigate
    //setisauthen true
  };
  const handleLoginSuccess = async() => {
    try{
      const requestBody = {
        userRole,
        firstName: name.firstName,
        password: pass.password,
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login`,requestBody);
      if(response.data.success){
        console.log(response.data)
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user)); //local storage stores as object
        toast.success(response.data.message);

        if (userRole === "Instructor") {
          // Save the instructorId to state or localStorage
          localStorage.setItem("instructorId", response.data.instructorId);
        }
        setIsAuthenticated(true);
        setTimeout(()=>{
          navigate("/")
        },2000)
      }
      else {
        toast.error(response.data.message || "Something went wrong. Try again.");
      }

    }
    catch(e){
      console.log(e);
      toast.error("An Error Occured");
    }
  };

  const handleSignupSuccess = async () => {
    if (pass.password !== pass.confirmpass) {
      toast.error("Passwords do not match! Try again");
    } else {
      try {
        const requestBody = {
          userRole,
          firstName: name.firstName,
          password: pass.password,
          confirmpass:pass.confirmpass,
          ...(userRole === "Student" && { studentId: name.studentId }),
          ...(userRole === "Instructor" && { instructorId: name.instructorId }),
        };

        console.log("Sending Request Body:", requestBody);

      
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/signup`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

  
        if (response.data.success) {
          toast.success("Account created successfully! Please log in.");
          setIsAuthenticated(false); 
        } else {
          toast.error(response.data.message || "Something went wrong. Try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error signing up! Please try again.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 min-h-screen flex justify-center items-center py-12">
      {/* Heading Section */}
      <div className="absolute top-6 left-0 right-0 text-center">
        <h1 className="text-5xl text-white font-extrabold bg-gradient-to-r from-greenLight to-lightBlue bg-clip-text text-transparent">
          PECResolve
        </h1>
      </div>

      {/* Main Login/Signup Form */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          {isAuthenticated ? "Login" : "Sign Up"} to PECResolve
        </h2>

        {/* Role Selector */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => toggleRole("Student")}
            className={`text-white px-6 py-2 rounded-md transition-all duration-300 transform ${userRole === "Student" ? "bg-greenLight scale-105" : "bg-gray-700"}`}
          >
            Student
          </button>
          <button
            onClick={() => toggleRole("Instructor")}
            className={`text-white px-6 py-2 rounded-md transition-all duration-300 transform ${userRole === "Instructor" ? "bg-greenLight scale-105" : "bg-gray-700"}`}
          >
            Instructor
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isAuthenticated) {
              handleLoginSuccess();
            } else {
              handleSignupSuccess();
            }
          }}
          className="space-y-6"
        >
          {/* Username Input */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-white text-2xl" />
            <input
              type="text"
              required
              name="firstName"
              value={name.firstName}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-greenLight"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center space-x-4">
            <FaLock className="text-white text-2xl" />
            <input
              type="password"
              required
              value={pass.password}
              onChange={handlePasswordChange}
              name="password"
              placeholder="Password"
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-greenLight"
            />
          </div>

          {/* Additional Fields for SignUp */}
          {!isAuthenticated && (
            <div className="space-y-4">
              {/* Confirm Password (for SignUp) */}
              <div className="flex items-center space-x-4">
                <FaLock className="text-white text-2xl" />
                <input
                  type="password"
                  required
                  value={pass.confirmpass}
                  onChange={handlePasswordChange}
                  name="confirmpass"
                  placeholder="Confirm Password"
                  className="w-full bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-greenLight"
                />
              </div>

              {/* Role-based Fields */}
              {userRole === "Student" && (
                <div className="flex items-center space-x-4">
                  <FaSchool className="text-white text-2xl" />
                  <input
                    type="text"
                    required
                    name="studentId"
                    value={name.studentId || ""}
                    onChange={handleUsernameChange}
                    placeholder="Student ID"
                    className="w-full bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-greenLight"
                  />
                </div>
              )}

              {userRole === "Instructor" && (
                <div className="flex items-center space-x-4">
                  <FaChalkboardTeacher className="text-white text-2xl" />
                  <input
                    type="text"
                    required
                    name="instructorId"
                    value={name.instructorId || ""}
                    onChange={handleUsernameChange}
                    placeholder="Instructor ID"
                    className="w-full bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-greenLight"
                  />
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-greenLight text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300"
          >
            {isAuthenticated ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Between Login and SignUp */}
        <div className="text-center mt-6">
          <p className="text-white text-sm">
            {isAuthenticated ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-greenLight font-semibold hover:underline"
            >
              {isAuthenticated ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
