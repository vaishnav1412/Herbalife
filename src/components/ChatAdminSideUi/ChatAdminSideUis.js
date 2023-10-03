// import React, { useEffect, useState } from 'react'

// import axios from "axios";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// import io from 'socket.io-client'
// let socket  =io.connect("http://localhost:5000")

// const ChatAdminSideUis = () => {
//   const { id } = useParams();
//   const [user,setUser] = useState('')
//   const [auther,setAuther] = useState('')
 
//   const [message,setMessage] = useState('')
//   const [ chat,setChat ] = useState([])


//   const chatMessagesAdmin =async () =>{
//     try {
      
//       const formdata = {
//           id
//       }
//       const response = await axios.post('/api/admin/getchatdata',formdata)

//       if(response.data.success){
//         setChat(response.data.data.chathistory)
       
//     }else{
//         toast.error(response.data.message)
//     }
      
//     } catch (error) {
//       console.log(error);
//     }
//   }

  
//   const getData =async ()=>{
//     const formData = {
//        id
//     }
//    const response =await axios.post("/api/admin/fetchsingledata",formData)
//    if(response.data.success){
//     setUser(response.data.data)
//     setAuther(response.data.auther)
//    }else{
//     toast.error(response.data.message)
//    }
//   }
//   useEffect(()=>{
   
//       getData()
//   })

//   const sendMessage = async() =>{
//     if(message!==""){
//       const messageData ={
//         room:user._id,
//         auther:auther.name,
//         message:message,
//         time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
//       }

//       await socket.emit("send_message",messageData)
//       setMessage('');
//     }
//   }

//   useEffect(()=>{
//     socket.on("receive_message",(data)=>{
      
//     })
//   },[socket])

//   useEffect(()=>{
//     chatMessagesAdmin()
//   },[])


//   return (
//     <div>
//        <div className="p-8 flex  align-middle justify-center">
//       <div>
//         <div class="container mx-auto w-96">
//           <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
//             <div class="flex items-center justify-between p-4 bg-gray-600 rounded-t-lg">
//               <img
//                 class="w-10 h-10 rounded-full"
//                 src={`http://localhost:5000/upload/${user?.image}`}
//                 alt="username"
//               />
//               <span class="text-white font-bold">{user?.name}</span>
//               <span class="w-3 h-3 bg-gray-700 rounded-full"></span>
//             </div>

//             <div class="max-h-80 overflow-y-auto p-4">
//               <ul class="space-y-2">
//               {chat?.map((message) => {
//   return (
//     <li key={message._id} className={`flex justify-${message.author === auther.name ? 'start' : 'end'}`}>
//       <div className={`bg-${message.author === auther.name ? 'green-500' : 'gray-100'} text-${message.author === auther.name ? 'white' : 'gray-800'} p-2 rounded-lg`}>
//         {message.message}
//       </div>
//     </li>
//   );
// })}
//               </ul>
//             </div>
//             <div class="flex items-center p-4 bg-gray-200 rounded-b-lg">
//               <input
//                 type="text"
//                 placeholder="Message"
//                 class="flex-grow px-4 py-2 bg-gray-300 rounded-full outline-none focus:bg-white focus:ring focus:ring-gray-600"
//                 onChange={(event) => { setMessage(event.target.value) }}
//                 value={message}
//               />
//               <button type='submit' onClick={sendMessage} class="text-gray-600 font-semibold ml-2 focus:outline-none hover:text-gray-700">
//   <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 4.5C2 3.67157 2.67157 3 3.5 3H20.5C21.3284 3 22 3.67157 22 4.5V17.5C22 18.3284 21.3284 19 20.5 19H3.5C2.67157 19 2 18.3284 2 17.5V4.5Z"/>
//     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13L12 8L17 13"/>
//   </svg>
// </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default ChatAdminSideUis
