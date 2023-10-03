import React, { useState } from "react";
import instance from "../../Axios/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Addaddress = () => {
  const location = useLocation();
  const id = location.state?.id;

  const navigate = useNavigate("");
  const [pin, setPin] = useState("");
  const [houseName, setHouseName] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");

  const [epin, esetPin] = useState("");
  const [ehouseName, esetHouseName] = useState("");
  const [eplace, esetPlace] = useState("");
  const [edistrict, esetDistrict] = useState("");

  const handleHouseName = (event) => {
    setHouseName(event.target.value);
  };
  const handlePlace = (event) => {
    setPlace(event.target.value);
  };
  const handlePin = (event) => {
    setPin(event.target.value);
  };
  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (houseName.length === 0) {
      esetHouseName("please enter valid housename");
      isVarified = false;
    }
    if (place.length === 0) {
      esetPlace("please enter valid place");
      isVarified = false;
    }
    if (district.length === 0) {
      esetDistrict("please enter valid district");
      isVarified = false;
    }
    if (pin <= 99999) {
      esetPin("please enter valid pin");
    }

    if (isVarified) {
      const formData = {
        houseName,
        place,
        district,
        pin,
        id,
      };
      try {
        instance
          .post("/api/user/addaddress", formData)
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);

              navigate("/user/userprofile");
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
    <div class="bg-slate-200 min-h-screen flex justify-center items-center">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-96 md:w-1/4 ">
        <h2 class="register-heading text-3xl font-bold text-center mb-8">
          Add Address
        </h2>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Your House Name"
              name="housename"
              onChange={handleHouseName}
            />
            <p class="text-red-500">{ehouseName}</p>
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Your Place"
              type="string"
              name="place"
              onChange={handlePlace}
            />
            <p class="text-red-500">{eplace}</p>
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Enter your District"
              name="district"
              onChange={handleDistrict}
            />
            <p class="text-red-500">{edistrict}</p>
          </div>
          <div class="relative">
            <input
              class="input-register border rounded-lg p-2 w-full"
              placeholder="Re-Enter Your PIN code"
              name="pin"
              type="number"
              onChange={handlePin}
            />
            <p class="text-red-500">{epin}</p>
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

export default Addaddress;
