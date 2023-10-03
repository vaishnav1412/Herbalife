import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";

const Editaddress = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState(0);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      instance
        .post("/api/user/profiledetails")
        .then((response) => {
          setUser(response.data.data);
          setAddress(response.data.data2.addresses);
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
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
    let id = user._id;

    if (isVarified) {
      const formData = {
        name,
        place,
        district,
        pin,
        id,
      };
      try {
        instance.post(
          "/api/user/userprofileaddressedit",
          formData
        )
        .then((response) => {
         
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/user/userprofile");
          } else {
            toast.error(response.data.message);
            navigate("/user/userprofile");
          }
        })
        .catch((error) => {
         
          toast.error('something went worng...');
        });
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
                defaultValue={address[0]?.name}
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
                defaultValue={address[0]?.place}
                onChange={handlePlace}
              />
              <p class="text-red-500"></p>
            </div>
            <div class="relative">
              <input
                class="input-register border rounded-lg p-2 w-full"
                placeholder="Enter your District"
                name="district"
                defaultValue={address[0]?.district}
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
                defaultValue={address[0]?.pin}
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

export default Editaddress;
