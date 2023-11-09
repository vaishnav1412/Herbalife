import { useLocation } from "react-router-dom";
import "./resetpassword.css";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../../util/api";

const Resetpassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [matchError, setMatchError] = useState("");

  const passwordchange = (event) => {
    setPassword(event.target.value);
  };
  const cpasswordchange = (event) => {
    setCpassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (password.length < 8) {
      isVarified = false;
      setError("Password must be at least 8 characters long.");
    }
    if (password !== cpassword) {
      isVarified = false;
      setMatchError("Passwords do not match.");
    }
    if (isVarified) {
      const formData = {
        password,
        email,
      };

      try {
        const response = await axios.post(apiEndPoints.resetPassword, formData);

        if (response.data.success) {
          if (response.data.data === "admin") {
            toast("Rediarected to login page");
            toast.success(response.data.message);
            navigate("/admin");
          } else {
            toast("Rediarected to login page");
            toast.success(response.data.message);
            navigate("/public/");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("reset password failed :", error);
      }
    }
  };

  return (
    <div className="password_app">
      <div className="password_container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="password_input"
              placeholder="Enter Your New Password"
              type="password"
              onChange={passwordchange}
            />
            <p className="passworderror">
              {error}
              {matchError}
            </p>
            <input
              className="password_input"
              placeholder="Confirm Your Password"
              onChange={cpasswordchange}
              type="password"
            />
            <p className="passworderror">{matchError}</p>
          </div>
          <div>
            <button className="btn6" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
