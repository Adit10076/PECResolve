import React, { useState } from "react";
import { FaClipboardList, FaChalkboardTeacher } from "react-icons/fa";
import  ResolveComplaint from "../components/ResolveComplaint.js"
import { useNavigate } from "react-router-dom";
import Header from './Header.js'
const InstructorDashboard = ({ complaint }) => {
  // Function to determine instructor type based on instructorId
  const getInstructorType = (instructorId) => {
    if (instructorId.startsWith('12')) {
      return 'General';
    } else if (instructorId.startsWith('34')) {
      return 'Hostel';
    } else if (instructorId.startsWith('56')) {
      return 'Campus';
    } else if (instructorId.startsWith('78')) {
      return 'Urgent';
    }
    return 'Unknown';
  };

  // Determine the instructor type
  const instructorId = localStorage.getItem('instructorId');
  const instructorType = getInstructorType(instructorId);

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplaint = () => {
    // Filter complaints by instructor type
    const filtered = complaint.filter(
      (comp) => comp.complaintType === instructorType
    );

    // Set filtered complaints to the state
    setFilteredComplaints(filtered);

    // Open the modal to show filtered complaints
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleResolveClick = (complaintId) => {
    navigate(`/resolve-complaint/${complaintId}`);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto max-w-4xl text-center space-y-8">
        {/* Dashboard Header */}
        <h2 className="text-4xl font-semibold">Instructor Dashboard</h2>
        <p className="text-lg">As a {instructorType} instructor, you can manage complaints raised by students.</p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-6">
          <div className="bg-gray-700 p-6 rounded-md shadow-lg w-48">
            <FaClipboardList className="text-3xl mb-4 text-greenLight" />
            <button
              onClick={handleComplaint}
              className="text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300"
            >
              View All Complaints
            </button>
          </div>
                  {/* Modal for Viewing Complaints */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
            <div className="bg-gray-800 p-8 rounded-md w-96 space-y-4 overflow-y-scroll h-screen">
              <h3 className="text-xl text-white font-semibold">Manage Complaints</h3>
              <p className="text-white mb-4">Here you can view and manage complaints of type: {instructorType}</p>

              {/* Display filtered complaints */}
              <div className="space-y-2">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md overflow-y-auto overflow-x-hidden">
                      <p className="text-white font-semibold">Complaint Type: {complaint.complaintType}</p>
                      <p className="text-white">Complaint Title: {complaint.title}</p>
                      <p className="text-white">Description: {complaint.description}</p>
                      <div className="mt-4 flex justify-around space-x-4 items-center">
                        <button className="bg-greenLight text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300"
                        onClick={() => handleResolveClick(complaint._id)}>
                           Resolve
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No complaints found for this type.</p>
                )}
              </div>

              <button
                onClick={closeModal}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-all duration-300 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
          <div className="bg-gray-700 p-6 rounded-md shadow-lg w-48">
            <FaChalkboardTeacher className="text-3xl mb-4 text-greenLight" />
            <button className="text-white">Resolve Complaints</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;
