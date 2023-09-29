import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const navigate = useNavigate("");

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (name === "") {
      setError1("Please Enter Video Name");
      isVarified = false;
    }
    if (link === "") {
      setError2("Please Enter A Valid link ");
      isVarified = false;
    }

    if (isVarified) {
      let formData = {
        name,
        link,
      };
      try {
        const response = await axios.post("/api/admin/addvideos", formData);
        if (response.data.success) {
          toast.success(response.data.message);

          navigate("/dashboard/workouts");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  return (
    <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 class="register-heading text-3xl font-bold text-center mb-8">
          Add Video
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
              placeholder="Enter link of the video"
              type="text"
              name="link"
              onChange={handleLink}
            />
            <p class="text-red-500">{error2}</p>
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

export default AddVideo;
