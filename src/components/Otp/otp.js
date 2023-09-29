import { useLocation } from "react-router-dom";
import "./otp.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Otp = () => {
  const navigate = useNavigate();
  const location =useLocation()
  const email = location.state?.email;
  
  const [otp, setOtp] = useState("");
  const [error,setError] = useState("")
  const handleOtp = (event) => {
    setOtp(event.target.value);
  };
  const handleSubmit = async (event)=>{
    event.preventDefault();
    let isVarified = true;
    if(otp.trim()===''){
      setError('Please enter a valid otp')
      isVarified=false}

      if(isVarified){
        const formData = {
        otp,
        email
        };
        try {
          const response = await axios.post("/api/user/otp", formData);

          if (response.data.success) {
            toast.success(response.data.message);
           
            navigate("/"); 
          } else {
            toast.error(response.data.message);
          }

 
        } catch (error) {
          console.error("Email varification failed :", error);
        }
      }
    
  }
  return (
    <div className="otp_app">
      <div className="otp_container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="input_otp"
              placeholder="Enter Your OTP"
              onChange={handleOtp}
            />
            <p className="otperror">{error}</p>
          </div>
          <div>
            <button className="btn4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
