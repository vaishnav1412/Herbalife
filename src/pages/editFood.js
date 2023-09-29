import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditFood = () => {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();
  const [menu, setMenu] = useState("");
  const [day, setDay] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [foods, setFood] = useState("");
  const [catogory, setCatogory] = useState("");
  console.log(id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (isVarified) {
      const formData = {
        day,
        type,
        time,
        foods,
        catogory,
        id,
      };
      try {
        const response = await axios.post("/api/admin/editfood", formData);
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

  const fetchData = async () => {
    const formData = {
      id,
    };
    const response = await axios.post("/api/admin/fetchidfood", formData);
    if (response) {
      toast("rediarect to edit page");
      setMenu(response.data.data);
    } else {
      toast("something wentwrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 class="register-heading text-3xl font-bold text-center mb-8">
          Edit Food
        </h2>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div class="relative">
            <select
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue={menu?.day}
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
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Type Of Food"
              type="string"
              name="type"
              onChange={(e) => setType(e.target.value)}
              defaultValue={menu?.type}
            />
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Time Duration"
              name="duration"
              onChange={(e) => setTime(e.target.value)}
              defaultValue={menu?.time}
            />
          </div>
          <div class="relative">
            <textarea
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter food items "
              name="food"
              type="text"
              defaultValue={menu.foods}
              onChange={(e) => setFood(e.target.value)}
            />
          </div>

          <div class="relative">
            <select
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue={menu?.catogory}
              onChange={(e) => setCatogory(e.target.value)}
            >
              <option value="" disabled selected>
                Choose an option
              </option>
              <option value="gain">Gain</option>
              <option value="lose">Lose</option>
            </select>
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

export default EditFood;
