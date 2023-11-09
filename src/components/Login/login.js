import React, { useState } from 'react'
import './login.css'
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { apiEndPoints } from "../../util/api";
const logo =require('../../assets/other/main-logo.png')



const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

   const [email,setEmail] = useState('')
   const [password,setPassword] =  useState('')
   const [emailError,setEmailError] = useState('')
   const [passwordError,setPasswordError] = useState('')
   const [loginFailed, setLoginFailed] = useState(false);

   const handleEmail = (event) =>{
       setEmail(event.target.value)
   }
   const handlePassword = (event)=>{
       setPassword(event.target.value)
   }

   const handleSubmit =async (event) =>{
    event.preventDefault();
    let isVarified = true;
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      isVarified = false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isVarified = false;
    }
    if (isVarified) {
      const formData = {
        email,
        password,
      };
      try {
        dispatch(showLoading())
        const response = await instance.post(apiEndPoints.login, formData);
        dispatch(hideLoading())
        if (response.data.success) {
          toast.success(response.data.message);
          toast('Rediarected to home page')
          localStorage.setItem("token",response.data.data)
          navigate("/user/home", { state: { email } }); 
        } else {
          toast.error(response.data.message);
          setLoginFailed(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch(hideLoading())
      }
    }
   }

   const googleSign = async(name,email)=>{
    try {
      const formData={
        name,email
      }
      if(formData){
        const response = await instance.post(apiEndPoints.googleLogin, formData);

        if (response.data.success) {
          toast.success(response.data.message);
          toast('Rediarected to home page')
          localStorage.setItem("token",response.data.data)
          navigate("/user/home", { state: { email } }); 
        } else {
          toast.error(response.data.message);
          setLoginFailed(true);
        }

      }else{
        console.log('something went wrong');
      }
      
    } catch (error) {
      console.log(error);
    }
   }



  return (
    <div>
      <div className="login_app" >
        <img className='logo' src={logo} alt="Image description" />
      <div className="login_container">
        <h2 className="login_center text-3xl font-bold ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input  className='input_login' placeholder='Enter your Email' onChange={handleEmail} />
            <p className="error">{emailError}</p>
          </div>
          <div>
            <input className='input_login' placeholder='Enter Your Password' type='password' onChange={handlePassword}/>
            <p className="error">{passwordError}</p>
          </div>
          
          <div>
            <a className='register_link ' href='/public/register'>Register</a>
          </div>

          <div>
            <button className="btn2" type="submit">
              Login
            </button>
            
          </div>
          <div className='flex justify-center items-center'>
          <GoogleOAuthProvider clientId="964168966527-95slo1n2b6ket1dsthv99cvlt0uhl25g.apps.googleusercontent.com"> 
            <GoogleLogin
              onSuccess={credentialResponse => {
                const details = jwt_decode(credentialResponse.credential)
                 console.log(details.name);
                 googleSign(details.name,details.email)

                                }}
                   onError={() => {
                   console.log('Login Failed');
                     }}
                  /> </GoogleOAuthProvider>
          </div>
        </form>
        <div className="login_center">
        {loginFailed && (
              <a className="forgot_password_link" href="/public/email">
                Forgot Password?
              </a>
            )}
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default Login
