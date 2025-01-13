import React from 'react'
import Header from "./Header"
import axios from 'axios'
import { useEffect } from 'react'
import {toast} from "react-toastify"
const ViewItems = ({ name ,setuserName,items,setItems}) => {
    const handleSubmit = async (id) => {
        try {
          //call the api
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/deleteItem/${id}`);
          setItems(items.filter(item => item._id !== id));
          toast.success("Item Removed Successfully")
        }
        catch (error) {
          toast.error(error.message);
        }
      }
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/items`);
            if (response.data.success) {
                setItems(response.data.items);
                console.log(response.data)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
     useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const obj = JSON.parse(storedUser);
        setuserName({
          firstName: obj.firstName,
        });
    },[]);
    useEffect(() => {
        fetchItems();

    }, []);
    return (
        <div className="bg-gray-900 min-h-screen pt-5">
            <div>
                <Header />
            </div>
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-4xl font-semibold text-white mb-8">View Your Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.length > 0 ? (
                        items.map((item) => (
                            item.firstName === name.firstName ? <>
                                <div key={item._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-500">
                                    <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                                    <p className="text-gray-400 mb-4">{item.description}</p>
                                    <p className="text-green-500 font-bold mb-4">{item.complaintType}</p>
                                    <button onClick={() => handleSubmit(item._id)} className="text-red-500 hover:underline">Delete Item</button>
                                </div>
                            </> : ""
                        ))
                    ) : (
                        <p className="text-white">No Items to display</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewItems;
