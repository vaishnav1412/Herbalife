import React, { useState } from "react";
import "./rejister.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
const logo = require("../../assets/other/main-logo.png");

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //FOR FORM VALUES
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  //FOR ERROR HANDLING
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
    setNameError("");
  };
  const changeAge = (event) => {
    setAge(event.target.value);
    setAgeError("");
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };
  const changeCpassword = (event) => {
    setCpassword(event.target.value);
    setCpasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (name.trim() === "") {
      setNameError("Please enter a valid name");
      isVarified = false;
    }
    if (age < 18) {
      setAgeError("Please enter a valid age");
      isVarified = false;
    }
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      isVarified = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isVarified = false;
    }

    if (password !== cpassword) {
      setCpasswordError("Passwords do not match.");
      isVarified = false;
    }

    if (isVarified) {
      const formData = {
        name,
        age,
        email,
        password,
      };
      try {
        dispatch(showLoading())
        const response = await axios.post("/api/user/register", formData);
        dispatch(hideLoading())
        if (response.data.success) {
          toast.success(response.data.message);
          toast("please verify your email");
          navigate("/public/otp", { state: { email } }); // Pass the email as state
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading())
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="register_app">
      <img className="logo" src={logo} alt="Image description" />
      <div className="register_container">
        <h2 className="register_center1 text-3xl font-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="input_register"
              placeholder="Enter Your Name"
              name="name"
              onChange={changeName}
            />
            <p className="error">{nameError}</p>
          </div>
          <div>
            <input
              className="input_register"
              placeholder="Enter Your Age"
              type="number"
              name="age"
              onChange={changeAge}
            />
            <p className="error">{ageError}</p>
          </div>
          <div>
            <input
              className="input_register"
              placeholder="Enter your Email"
              name="email"
              onChange={changeEmail}
            />
            <p className="error">{emailError}</p>
          </div>
          <div>
            <input
              className="input_register"
              placeholder="Enter Your Password"
              name="password"
              type="password"
              onChange={changePassword}
            />
            <p className="error">{passwordError}</p>
          </div>
          <div>
            <input
              className="input_register"
              placeholder="Re-Enter Your Password"
              name="cpassword"
              type="password"
              onChange={changeCpassword}
            />
            <p className="error">{cpasswordError}</p>
          </div>
          <div>
            <a className="Login_link " href="/">
              Login
            </a>
          </div>

          <div>
            <button className="btn1" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="register_center"></div>
      </div>
    </div>
  );
};

export default Register;
