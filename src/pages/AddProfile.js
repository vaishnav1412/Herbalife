import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddProfile = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(0);
  const [qualification, setQualification] = useState("");
  const [roleError, setRoleError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state?.id;

  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleExperience = (event) => {
    setExperience(event.target.value);
  };
  const handleQualification = (event) => {
    setQualification(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (role === "") {
      setRoleError("please enter valid role");
      isVarified = false;
    }
    if (experience === 0) {
      setExperienceError("please enter valid experience");
      isVarified = false;
    }
    if (qualification === "") {
      setQualificationError("please enter valid qualification");
      isVarified = false;
    }
    if (isVarified) {
      const formData = {
        id,
        role,
        experience,
        qualification,
      };
      try {
        const response = await axios.post(
          "/api/admin/adminprofiledata",
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);

          navigate("/dashboard/profile");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Email varification failed :", error);
      }
    }
  };

  return (
    <div>
      <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
        <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
          <h2 class="register-heading text-3xl font-bold text-center mb-8">
            Add Profile
          </h2>
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Role"
                onChange={handleRole}
              />
              <p class="text-red-500">{roleError}</p>
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Experience"
                type="number"
                onChange={handleExperience}
              />
              <p class="text-red-500">{experienceError}</p>
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Qualification"
                onChange={handleQualification}
              />
              <p class="text-red-500">{qualificationError}</p>
            </div>
            <div class="relative">
              <button class="btn1 w-full py-2 bg-black text-white rounded-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
