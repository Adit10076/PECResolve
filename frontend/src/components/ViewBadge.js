import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMedal } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";

const ViewBadge = ({ name, userRole, complaint, setuserName, setUserRole }) => {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const instructorId = localStorage.getItem("instructorId");
    const obj = JSON.parse(storedUser);

    setUserRole(obj.userRole);
    const name = {
      firstName: obj.firstName,
      instructorId: instructorId,
    };
    setuserName(name);

    const fetchInstructorData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/getuser`, name);
        setInstructor(response.data.user);
      } catch (error) {
        console.error("Error fetching instructor data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [setUserRole, setuserName]);

  if (loading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="flex mt-10 text-red-500 items-center justify-center">
        Error loading data.
      </div>
    );
  }

  const { firstName, resolvedComplaints, badgeType, resolvedComplaintsData = [] } = instructor;

  const badgeThresholds = { Bronze: 0, Silver: 11, Gold: 51, Platinum: 101 };
  const badgeIcons = {
    Bronze: <FaMedal size={24} className="text-yellow-600" />,
    Silver: <FaMedal size={24} className="text-gray-400" />,
    Gold: <FaMedal size={24} className="text-yellow-300" />,
    Platinum: <GiLaurelCrown size={24} className="text-blue-500" />,
  };

  const badgeKeys = Object.keys(badgeThresholds);
  const currBadgeIndex = badgeKeys.indexOf(badgeType);
  const nextBadge = currBadgeIndex !== badgeKeys.length - 1 ? badgeKeys[currBadgeIndex + 1] : "Platinum";
  const progressToNextBadge =
    badgeType !== "Platinum" ? badgeThresholds[nextBadge] - resolvedComplaints : null;

  return (
    <div className="min-h-screen bg-deepBlue text-lightGray p-6 flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-grayBlue rounded-md shadow-lg p-6">
        <div className="flex items-center justify-between mb-8 gap-10">
          <h1 className="text-4xl font-bold text-greenLight">Badge Dashboard</h1>
          <div className="flex items-center space-x-2 bg-red-500 text-deepBlue px-4 py-1 rounded-md shadow-md">
            {badgeIcons[badgeType]}
            <span className="text-lg text-white">{badgeType} Badge</span>
          </div>
        </div>

        <div className="bg-deepBlueHead p-4 rounded-md mb-6">
          <h2 className="text-xl font-semibold text-lightBlue">Hello, {firstName}!</h2>
          <p className="text-md text-grayText mt-2">
            Resolved Complaints: <span className="text-softGold font-bold">{resolvedComplaints}</span>
          </p>
        </div>

        {badgeType !== "Platinum" && (
          <div className="bg-deepBlueHead p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold text-lightBlue">Progress to Next Badge</h3>
            <p className="text-grayText mt-2">
              Resolve <span className="text-softGold font-bold">{progressToNextBadge}</span> more complaints to
              earn the <span className="text-softGold font-bold">{nextBadge}</span> badge!
            </p>
            <div className="relative mt-4 bg-gray2 rounded-full h-4">
              <div
                className="absolute top-0 left-0 h-4 rounded-full bg-lightBlue300"
                style={{
                  width: `${((resolvedComplaints % badgeThresholds[nextBadge]) /
                    (badgeThresholds[nextBadge] || 1)) *
                    100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-deepBlueHead p-4 rounded-md overflow-y-scroll h-96">
          <h3 className="text-lg font-semibold text-lightBlue mb-4">Resolved Complaints</h3>
          <table className="w-full text-grayText border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 bg-deepBlue text-lightBlue">Complaint Title</th>
              </tr>
            </thead>
            <tbody>
              {resolvedComplaintsData.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-grayBlue">
                  <td className="py-2 px-4">{complaint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBadge;
