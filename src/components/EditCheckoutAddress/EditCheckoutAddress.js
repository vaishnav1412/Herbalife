import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiEndPoints } from "../../util/api";
const EditCheckoutAddress = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState(0);

  const location = useLocation();

  const addressId = location.state.stateObject.addressId;
  const id = location.state.stateObject.id;

  const navigate = useNavigate();

  const getAddress = async () => {
    try {
      const formData = {
        addressId,
        id,
      };
      if (addressId) {
        const response = await instance.post(
          "/api/user/fetchsingleaddress",
          formData
        );

        if (response.data.success) {
          setAddress(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePlace = (event) => {
    setPlace(event.target.value);
  };
  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handlePin = (event) => {
    setPin(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (isVarified) {
      const formData = {
        name,
        place,
        district,
        pin,
        id,
        addressId,
      };
      try {
        const response = await instance.post(
         apiEndPoints.editCheckoutAddress,
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/user/checkout");
        } else {
          toast.error(response.data.message);
          navigate("/user/checkout");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div class="bg-slate-200 min-h-screen flex justify-center items-center">
        <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-96 md:w-1/4 ">
          <h2 class="register-heading text-3xl font-bold text-center mb-8">
            Edit Address
          </h2>
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your House Name"
                name="housename"
                defaultValue={address?.name}
                onChange={handleName}
              />
              <p class="text-red-500"></p>
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter Your Place"
                type="string"
                name="place"
                defaultValue={address?.place}
                onChange={handlePlace}
              />
              <p class="text-red-500"></p>
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter your District"
                name="district"
                defaultValue={address?.district}
                onChange={handleDistrict}
              />
              <p class="text-red-500"></p>
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Re-Enter Your PIN code"
                name="pin"
                type="number"
                defaultValue={address?.pin}
                onChange={handlePin}
              />
              <p class="text-red-500"></p>
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
    </div>
  );
};

export default EditCheckoutAddress;
