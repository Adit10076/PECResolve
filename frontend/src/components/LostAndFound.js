
import React, { useState } from "react";
import LostItemCard from "./LostItemCard";
import AddItemForm from "./AddItemForm";

const LostAndFound = ({items,setItems,addItem}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <h1 className="text-4xl text-center font-extrabold mb-8">Lost and Found</h1>
      
      {/* Add Lost or Found Item Form */}
      <AddItemForm items={items} setItems={setItems} addItem={addItem} />
      {console.log(items)}
      {/* Display Lost and Found Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 ml-20">
        {items.map((item) => (
          <LostItemCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default LostAndFound;
