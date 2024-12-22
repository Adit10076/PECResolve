
import React from "react";

const LostItemCard = ({item}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold">{item.title}</h3>
      <p className="text-gray-400">{item.description}</p>
      <p className={`mt-4 text-lg font-bold ${item.type === "lost" ? "text-red-500" : "text-green-500"}`}>
        {item.type === "lost" ? "Lost" : "Found"}
      </p>
    </div>
  );
};

export default LostItemCard;
