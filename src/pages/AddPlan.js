import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import admininstance from "../Axios/adminAxiosConfig";

const AddPlan = () => {
  const navigate = useNavigate("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleFeatures = (event) => {
    setFeatures(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (name === "") {
      setError1("Please Enter Plan Name");
      isVarified = false;
    }
    if (price === "") {
      setError2("Please Enter A Valid Amount ");
      isVarified = false;
    }
    if (duration === "") {
      setError3("Please Enter Plan Duration");
      isVarified = false;
    }
    if (features === "") {
      setError4("Please Enter features");
      isVarified = false;
    }

    if (isVarified) {
      let formData = {
        name,
        price,
        duration,
        features,
      };
      try {
        admininstance
        .post("/api/admin/addplans", formData)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
  
            navigate("/dashboard/plan");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  return (
    <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 class="register-heading text-3xl font-bold text-center mb-8">
          Add Plans
        </h2>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Your Plan Name"
              name="name"
              onChange={handleName}
            />
            <p class="text-red-500">{error1}</p>
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Price Of The Plan"
              type="number"
              name="price"
              onChange={handlePrice}
            />
            <p class="text-red-500">{error2}</p>
          </div>
          <div class="relative">
            <select
              class="input-register border rounded-lg p-2 w-full"
              name="duration"
              onChange={handleDuration}
            >
              <option value="" disabled selected>
                Select a Plan
              </option>
              <option value="1">1 Month Plan</option>
              <option value="3">3 Month Plan</option>
              <option value="6">6 Month Plan</option>
              <option value="12">1 Year Plan</option>
            </select>
            <p class="text-red-500">{error3}</p>
          </div>

          <div class="relative">
            <textarea
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Features Of The Plan(comma-separated)"
              name="features"
              type="text"
              onChange={handleFeatures}
            />
            <p class="text-red-500">{error4}</p>
          </div>
          <div class="relative">
            <button class="btn1 w-full py-2 bg-black text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlan;
