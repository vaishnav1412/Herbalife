import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditAdminProfile = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(0);
  const [qualification, setQualification] = useState("");
  const [details, setDetails] = useState("");

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

    if (isVarified) {
      const formData = {
        id,
        role,
        experience,
        qualification,
      };
      try {
        const response = await axios.post(
          "/api/admin/adminprofileeditdata",
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);

          navigate("/dashboard/profile");
        } else {
          toast.error(response.data.message);

          navigate("/dashboard/profile");
        }
      } catch (error) {
        console.error("Email varification failed :", error);
      }
    }
  };

  const getData = async () => {
    const formData = {
      id,
    };
    try {
      if (id) {
        const response = await axios.post("/api/admin/fetchdetails", formData);

        if (response.data.success) {
          setDetails(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast("somthing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
        <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
          <h2 class="register-heading text-3xl font-bold text-center mb-8">
            Edit Profile
          </h2>
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Role"
                onChange={handleRole}
                defaultValue={details.role}
              />
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Experience"
                type="number"
                onChange={handleExperience}
                defaultValue={details.experience}
              />
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Qualification"
                onChange={handleQualification}
                defaultValue={details.qulification}
              />
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

export default EditAdminProfile;
