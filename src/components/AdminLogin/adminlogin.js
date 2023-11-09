import React, { useState } from "react";
import "./adminlogin.css";
import { apiEndPoints } from "../../util/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import admininstance from "../../Axios/adminAxiosConfig";

const logo = require("../../assets/other/main-logo.png");

const Adminlogin = () => {
  const navigate =useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };


  const handlePassword = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
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
        const response = await admininstance.post(apiEndPoints.adminLogin, formData);
        if (response.data.success) {
          toast.success(response.data.message);
          toast("Rediarected to home page");
          localStorage.setItem("admin_token", response.data.data);
          navigate("/dashboard", { state: { email } }); 
        } else {
          toast.error(response.data.message);
          setLoginFailed(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="admin_login_app">
      <img className="logo" src={logo} alt="Image description" />
      <div className="admin_login_container">
        <h2 className="login_center text-3xl font-bold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="admin_input_login"
              placeholder="Enter your Email"
              onChange={handleEmail}
            />
            <p className="error">{emailError}</p>
          </div>
          <div>
            <input
              className="admin_input_login"
              placeholder="Enter Your Password"
              type="password"
              onChange={handlePassword}
            />
             <p className="error">{passwordError}</p>
          </div>

          <div>
            <a className="register_link " href="/register">
              Register
            </a>
          </div>

          <div>
            <button className="btn3" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="admin_login_center">
        {loginFailed && (
              <a className="forgot_password_link" href="/email">
                Forgot Password?
              </a>
            )}
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
