import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import ChatAdminSideUis from '../ChatAdminSideUi/ChatAdminSideUis';
import axios from "axios";
import toast from "react-hot-toast";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const AdminChat = () => {
  const navigate = useNavigate()
   const [user,setUser] = useState([])
   const [membership,setMembership] = useState('')
   
   const room =user._id
   const singleuser =(id)=>{
    socket.emit("join_room",id)
    navigate(`/dashboard/adminchat/singelchat/${id}`);
   }


   const getData= async () =>{ 

    const response = await axios.post('/api/admin/getprimeuserdata')

    if(response.data.success){
        setUser(response.data.data)
       
    }else{
        toast.error(response.data.message)
    }
 
}

    useEffect(()=>{
        getData()
    },[])


  return (
    <div className='p-3  bg-slate-200'>
      
      <div class="container mx-auto bg-slate-300">
      <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div class="border-r border-gray-500 bg-slate-200 lg:col-span-1">
          <div class="mx-3 my-3">
            <div class="relative text-gray-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" class="w-6 h-6 text-gray-700">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" class="block w-full py-2 pl-10 bg-white rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>
          <h2 class="my-2 mb-2 ml-2 text-lg text-gray-800">Chats</h2>
          <ul class="overflow-auto h-96 ">
            
            <li>

              {user.map((items)=>{
              return<a onClick={()=>{singleuser(items._id,room)}}
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out text-white  bg-slate-700 border-b border-gray-400 cursor-pointer hover:bg-gray-400 focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                   src={`http://localhost:5000/upload/${items?.image}`} alt="username" />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-white">{items?.name}</span>
                    <span class="block ml-2 text-sm text-gray-100">25 minutes</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-100">bye</span>
                </div>
              </a>
              })}
            </li>
          </ul>
        </div>

        <div class="hidden lg:col-span-2 lg:block">
          <div class="w-full">
           <Routes>
            <Route path='/singelchat/:id' element={<ChatAdminSideUis socket={socket} room={room}/>}/>
           
           </Routes>
          </div>
        </div>
      </div>
    </div>
 

    </div>
  )
}

export default AdminChat
