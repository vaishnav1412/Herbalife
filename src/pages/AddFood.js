import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddFood = () => {
  const navigate = useNavigate();

  const [day, setDay] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [foods, setFood] = useState("");
  const [catogory, setCatogory] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;
    if (day === "") {
      setError1("the day must be required");
      isVarified = false;
    }
    if (type === "") {
      setError2("the type must be required");
      isVarified = false;
    }
    if (time === "") {
      setError3("the time must be required");
      isVarified = false;
    }
    if (foods === "") {
      setError4("the food must be required");
      isVarified = false;
    }
    if (catogory === "") {
      setError5("the catogory must be required");
      isVarified = false;
    }

    if (isVarified) {
      const formData = {
        day,
        type,
        time,
        foods,
        catogory,
      };
      try {
        const response = await axios.post("/api/admin/savefood", formData);
        if (response.data.success) {
          navigate("/dashboard/foods");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 class="register-heading text-3xl font-bold text-center mb-8">
          Add Food
        </h2>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div class="relative">
            <select
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="" disabled selected>
                Choose a day
              </option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <p class="text-red-500">{error1}</p>
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Type Of Food"
              type="string"
              name="type"
              onChange={(e) => setType(e.target.value)}
            />
            <p class="text-red-500">{error2}</p>
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Time Duration"
              name="duration"
              onChange={(e) => setTime(e.target.value)}
            />
            <p class="text-red-500">{error3}</p>
          </div>
          <div class="relative">
            <textarea
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter food items "
              name="food"
              type="text"
              onChange={(e) => setFood(e.target.value)}
            />
            <p class="text-red-500">{error4}</p>
          </div>

          <div class="relative">
            <select
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setCatogory(e.target.value)}
            >
              <option value="" disabled selected>
                Choose an option
              </option>
              <option value="gain">Gain</option>
              <option value="lose">Lose</option>
            </select>
            <p class="text-red-500">{error5}</p>
          </div>

          <div class="relative">
            <button class="btn1 w-full py-2 bg-black text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
        <div class="register-center"></div>
      </div>
    </div>
  );
};

export default AddFood;
