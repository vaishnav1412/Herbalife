import React, { useEffect, useState } from 'react'
import instance from '../../Axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";
const Editprofile = () => {
const navigate = useNavigate()
const [user,setUser] = useState('')
const [name,setName] =useState('')
const [age,setAge] =useState(0)
const [email,setEmail] =useState('')


useEffect(() => {
  const fetchUserDetails = async () => {
    try {


      instance.post(
        apiEndPoints.userProfileDetails,
        {},
        {
          headers: {
            Authorisation: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setUser(response.data.data);
      
      })
      .catch((error) => {
       
        toast.error('something went worng...');
      });
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  fetchUserDetails();
}, []);

  
const handleName =(event) =>{
setName(event.target.value)
}
  
const handleAge =(event) =>{
  setAge(event.target.value)
}
  
const handleEmail =(event) =>{
  setEmail(event.target.value)
}

const handleSubmit =async (event) =>{
  event.preventDefault();
  let isVarified =true
  let id = user._id
  if(isVarified){
    const formData = {
       name,
       age,
       email,
       id
        };
        try {


          instance.post(apiEndPoints.userProfileEditData, formData)
          .then((response) => {
           
            if (response.data.success) {
              toast.success(response.data.message);
             
              navigate("/user/userprofile"); 
            } else {
                toast.error(response.data.message);
             
                navigate("/user/userprofile"); 
            }
          })
          .catch((error) => {
           
            toast.error('something went worng...');
          });
          } catch (error) {
            console.log(error);
          }
}  
}


  return (
    <div>
       <div class="bg-slate-200 min-h-screen flex justify-center items-center">
    <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-96 md:w-1/4 ">
      <h2 class="register-heading text-3xl font-bold text-center mb-8">Edit Profile</h2>
      <form class="space-y-4" onSubmit={handleSubmit}>
        <div class="relative">
          <input
            class="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Your Name"
            name="name"
            defaultValue={user.name}
            onChange={handleName}
          />
          <p class="text-red-500"></p>
        </div>
        <div class="relative">
          <input
            class="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Your Age"
            type="number"
            name="age"
            defaultValue={user.age}
            onChange={handleAge}
          />
          <p class="text-red-500"></p>
        </div>
        <div class="relative">
          <input
            class="input-register border rounded-lg p-2 w-full"
            placeholder="Enter your Email"
            name="email"
            defaultValue={user.email}
            onChange={handleEmail}
          />
          <p class="text-red-500"></p>
        </div>
       
        <div class="relative">
          <button class="btn1 w-full py-2 bg-black text-white rounded-lg">
            Submit
          </button>
        </div>
      </form>
      <div class="register-center"></div>
    </div>
  </div>
    </div>
  )
}

export default Editprofile
