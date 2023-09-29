import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const VideocallRoomInputs = () => {
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  
  
  const navigate = useNavigate()
  

  const handleJoinRoom =useCallback(async() =>{
    const formData = {
      roomId
  }
  const response = await axios.post('/api/user/roomcheck',formData)
  if(response.data.success){

   navigate(`/user/videocall/${roomId}`);
  }else{
   toast.error(response.data.message)
  }


  },[roomId])

  const getData = async () => {
    try {
      const response = await axios.post("/api/user/findroomid");
      if (response.data.success) {
        setRoom(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  },[]);
  return (
    <div className=" p-5">
      <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
        <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
          <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
            <span className="block mb-2 dark:text-violet-400">
              Hebal Nutrition
            </span>
            <h1 className="text-5xl font-extrabold dark:text-gray-50">
              Build it for live Coaching
            </h1>

            <p className="my-8">
              <span className="font-medium dark:text-gray-50">
                Room Id will be Given below.
              </span>{" "}
              Use the Room Id To enter the Website.
            </p>

            <div className="mb-3">
              <label for="lastname" className="text-sm sr-only">
                Room Code
              </label>
              <input
                value={room}
                id="lastname"
                type="text"
                className="w-2/4 rounded-md  text-black"
              />
            </div>
            <div className="mb-3">
              <label for="lastname" className="text-sm sr-only">
                Room Code
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter Room Id"
                onChange={(e)=>setRoomId(e.target.value)}
                className="w-full h-8 rounded-md focus:ring text-black focus:ri dark:border-gray-700"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                handleJoinRoom();
              }}
              className="w-full py-2 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
            >
              Join the Room
            </button>
          </div>
          <img
            src="https://www.reviews.org/app/uploads/2020/05/Woman-on-a-video-conference-call-1.jpg"
            alt=""
            className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"
          />
        </div>
      </section>
    </div>
  );
};

export default VideocallRoomInputs;
