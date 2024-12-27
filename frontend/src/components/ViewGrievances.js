import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const ViewGrievances = () => {
const [grievances, setGrievances] = useState([]);
  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-white mb-8">View Grievances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {grievances.length > 0 ? (
            grievances.map((grievance) => (
              <div key={grievance._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-4">{grievance.title}</h3>
                <p className="text-gray-400 mb-4">{grievance.description}</p>
                <p className="text-green-500 font-bold mb-4">{grievance.category}</p>
                <Link to={`/grievance/${grievance._id}`} className="text-green-500 hover:underline">
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-white">No grievances to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewGrievances;
