import { useLocation } from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './forgototp.css'
import { apiEndPoints } from "../../util/api";
import React, { useState } from 'react'

const Forgototp = () => {
  const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email;

    const [otp,setOtp] = useState('')
    const [error,setError] = useState('')
    const otpsave =(event)=>{
        setOtp(event.target.value)
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        let isVarified = true;
        if(otp==="" || otp.length<6){
            isVarified = false
            setError('Please enter a valid OTP')
        }
        if(isVarified){
          const formData = {
            otp,
            email
            };

            try {
              const response = await axios.post(apiEndPoints.forgotOtp, formData);

              if (response.data.success) {
                toast('Rediarected to password reset page')
               
                navigate("/resetpassword",{ state: { email } });
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
                console.error("Email varification failed :", error);
            }
        }
    }

  return (
    <div className="forgot_otp_app">
    <div className="forgot_otp_container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="forgot_input_otp"
            placeholder="Enter Your OTP"
            onChange={otpsave}
          />
          <p className="otperror">{error}</p>
        </div>
        <div>
          <button className="btn5" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Forgototp
