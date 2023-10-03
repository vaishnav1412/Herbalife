import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import io from 'socket.io-client'
import { useLocation } from "react-router-dom";
 const socket = io.connect("http://localhost:5000")

const Chat = () => {
 

  const [admin,setAdmin] = useState('')
  const [user,setUser]  = useState('')
  const [message,setMessage] = useState('')
  const [ chat,setChat ] = useState([])
 
const location = useLocation()
const id = location.state?.id

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

  const chatMessages =async () =>{

    try {
      const formdata = {
          id
      }
      const response = await axios.post('/api/user/getchatdata',formdata)

      if(response.data.success){
        setChat(response.data.data.chathistory)
       
    }else{
        toast.error(response.data.message)
    }
      
    } catch (error) {
      console.log(error);
    }

  }


  const getData= async () =>{ 

    const response = await axios.post('/api/user/getadmindata')

    if(response.data.success){
        setAdmin(response.data.data)
        toast.success(response.data.message)
    }else{
        toast.error(response.data.message)
    }
 
}

    useEffect(()=>{
        getData()
        fetchUserDetails();
        chatMessages() 
      
    },[])

    
    
  const sendMessage = async() =>{
    if(message!==""){
      const messageData ={
        room:user._id,
        auther:user.name,
        message:message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message",messageData)

      setMessage('');
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received message:", data);  
    });  
  },[socket]);


  return (
    <div className="p-8 flex  align-middle justify-center">
      <div>
        <div class="container mx-auto w-96">
          <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
            <div class="flex items-center justify-between p-4 bg-green-500 rounded-t-lg">
              <img
                class="w-10 h-10 rounded-full"
                src={`http://localhost:5000/upload/${admin[0]?.image}`}

                alt="username"
              />
              <span class="text-white font-bold">{admin[0]?.name}</span>
              <span class="w-3 h-3 bg-green-600 rounded-full"></span>
            </div>

            <div class="max-h-80 overflow-y-auto p-4">
              <ul class="space-y-2">
              {chat.map((message) => {
  return (
    <li key={message._id} className={`flex justify-${message.author === user.name ? 'start' : 'end'}`}>
      <div className={`bg-${message.author === user.name ? 'green-500' : 'gray-100'} text-${message.author === user.name ? 'white' : 'gray-800'} p-2 rounded-lg`}>
        {message.message}
      </div>
    </li>
  );
})}
              </ul>
            </div>
            <div class="flex items-center p-4 bg-gray-200 rounded-b-lg">
              <input
                type="text"
                
                placeholder="Message"
                class="flex-grow px-4 py-2 bg-gray-300 rounded-full outline-none focus:bg-white focus:ring focus:ring-green-500"
                onChange={(event) => { setMessage(event.target.value) }}
                value={message}
             />
              <button onClick={sendMessage} class="text-green-500 font-semibold ml-2 focus:outline-none hover:text-green-600">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 4.5C2 3.67157 2.67157 3 3.5 3H20.5C21.3284 3 22 3.67157 22 4.5V17.5C22 18.3284 21.3284 19 20.5 19H3.5C2.67157 19 2 18.3284 2 17.5V4.5Z"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13L12 8L17 13"/>
  </svg>
</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
