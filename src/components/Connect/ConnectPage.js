import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

function ConnectPage() {
  const [user,setUser] =useState('')
  const id = user._id
const navigate = useNavigate()
const navigateToEnterRoom = () =>{
   navigate('/user/videocallroom')
}

const goToChat =()=>{
  socket.emit("join_room",id)
  navigate('/user/chat',{state: { id: id }})
}
const fetchUserDetails = async () => {
  try {

    const response = await axios.post(
      "/api/user/profiledetails",
      {},
      { 
        headers: {
          Authorisation: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setUser(response.data.data);
   
  } catch (error) {
    console.error("Error fetching user details", error);
  }
};


useEffect(()=>{
  
  fetchUserDetails()
},[])

  return (
    <div className="bg-white p-5">
    <div className="flex space-x-3 align-middle justify-center">
  
      <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div>
          <h2 className="mb-1 text-xl font-semibold text-pink-500">
            Instructions For Entering Chat Room
          </h2>
          <p className="text-sm dark:text-gray-400">
            We are committed to creating a safe and respectful environment for all users in our chat room. To ensure a positive and helpful experience for everyone, we kindly request that all users adhere to the following rules and regulations:
          </p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="text-sm dark:text-gray-400">
          <ul className="list-disc pl-5">
      <li>Respect and courtesy towards other users during chats.</li>
      <li>Keep the conversation on-topic and related to herbal nutrition, weight loss, and health.</li>
      <li>Do not engage in spamming or self-promotion during the chat sessions.</li>
      <li>Respect the privacy and confidentiality of all participants in the chat room.</li>
      <li>Maintain professionalism when seeking or providing advice or information.</li>
      <li>Adhere to all applicable laws and regulations while participating in chat room.</li>
      <li>Provide constructive feedback to help us improve our chat related services.</li>
    </ul>
          </div>
          <p className="text-xs text-center text-green-600 font-semibold mt-2">
        Chat Available: 5:30 PM - 8:30 PM
      </p>
          <div className="flex space-x-2 text-sm dark:text-gray-400">
            <button onClick={()=>{goToChat()}}
              type="button"
              className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              Go To Chat Room
            </button>
          </div>
        </div>
      </div>
  
    
      <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div>
          <h2 className="mb-1 text-xl font-semibold text-pink-500">
            Instructions For Entering VideoCall
          </h2>
          <p className="text-sm dark:text-gray-400">
            We are committed to creating a safe and respectful environment for all users in our video call. To ensure a positive and helpful experience for everyone, we kindly request that all users adhere to the following rules and regulations:
          </p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="text-sm dark:text-gray-400">
          <ul className="list-disc pl-5">
      <li>Respect and courtesy towards other users during video calls.</li>
      <li>Keep the conversation on-topic and related to herbal nutrition, weight loss, and health.</li>
      <li>Do not engage in spamming or self-promotion during the video call sessions.</li>
      <li>Respect the privacy and confidentiality of all participants in the video call.</li>
      <li>Maintain professionalism when seeking or providing advice or information.</li>
      <li>Adhere to all applicable laws and regulations while participating in video calls.</li>
      <li>Provide constructive feedback to help us improve our video call services.</li>
    </ul>
          </div>
          <p className="text-xs text-center text-green-600 font-semibold mt-2">
        videocall Available: 9:30 AM - 12:30 AM
      </p>
          <div className="flex space-x-2 text-sm dark:text-gray-400">
            <button onClick={()=>{navigateToEnterRoom()}}
              type="button"
              className="inline-block rounded bg-teal-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              Go To VideoCall
            </button>
          </div>
        </div>
       
      </div>
  
    </div>
  </div>
  
  );
}

export default ConnectPage;
