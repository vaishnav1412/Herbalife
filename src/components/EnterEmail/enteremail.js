import './enteremail.css'
import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../../util/api";
const Enteremail = () => {
  const navigate =useNavigate()
  const [email,setEmail] = useState('')
  const [error,setError] = useState('')

   const handleEmail = (event) =>{
     setEmail(event.target.value)
   }

   const handleSubmit =async (event) =>{
    event.preventDefault();
    let isVarified = true;
    if(!email.includes("@")){
        isVarified=false; 
        setError('Enter a valid email')
    }
    if(isVarified){
      const formData = {
        email
      };

      try {
        const response = await axios.post(apiEndPoints.confirmEmail, formData);
        if (response.data.success) {
          toast('Rediarected to otp page')
          navigate("/public/forgototp", { state: { email } }); 
        } else {
          toast.error(response.data.message);
          
        }
      } catch (error) {
        console.log('error');
      }
    }
   }


  return (
    <div className="email_app">
    <div className="email_container">
      <form onSubmit={handleSubmit}>
        <div>
          
          <input
            className="email_input"
            placeholder="Enter Your email"
             onChange={handleEmail}
          />
          <p className="emailerror">{error}</p>
        </div>
        <div>
          <button className="btn7" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Enteremail
