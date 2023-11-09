import "./headder.css";
import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { apiEndPoints } from "../../util/api";
const logo = require("../../assets/other/my-logo.png");

const Headder = () => {
  let [user, setUser] = useState("");
  const id = user._id;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const fetchUserDetails = async () => {
    try {
      instance
        .post(apiEndPoints.userProfileDetails)
        .then((response) => {
          setUser(response.data.data);
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
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      if (user.isBlock === 1) {
        localStorage.removeItem("token");

        navigate("/");
      }
    }
  });

  const navigateBmi = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/bmi");
      } else {
        navigate("/user/premiumuser");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateNotification = () => {
    navigate("/user/notification");
  };

  const navigateAppoinment = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/appoinment");
      } else {
        navigate("/user/premiumuser");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigatetoshop = () => {
    navigate("/user/shop");
  };

  const navigateWorkout = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/workouts");
      } else {
        navigate("/user/premiumuser");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateFoodControll = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/foods");
      } else {
        navigate("/user/premiumuser");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigateHome = () => {
    navigate("/user/home");
  };
  const navigateProfile = () => {
    navigate("/user/userprofile");
  };

  return (
    <div className="headder_container">
      <nav className="bg-white border-b-2 border-gray-800">
        <div className="flex justify-between items-center p-4 md:p-4 max-w-screen-xl mx-auto">
          <a href="https://flowbite.com" className="flex items-center">
            <img src={logo} className="h-10 md:h-12 mr-2" alt="Flowbite Logo" />
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4 text-gray-900">
              <li>
                <a
                  onClick={() => {
                    navigateHome();
                  }}
                  className="hover:underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigatetoshop();
                  }}
                  className="hover:underline"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigateBmi();
                  }}
                  className="hover:underline"
                >
                  BMI
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigateAppoinment();
                  }}
                  className="hover:underline"
                >
                  Appoinment
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigateWorkout();
                  }}
                  className="hover:underline"
                >
                  Workouts
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigateFoodControll();
                  }}
                  className="hover:underline"
                >
                  Food Control
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigateNotification();
                  }}
                  className="hover:underline"
                >
                  Notification
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigateProfile();
                  }}
                  className="hover:underline"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="hover:underline text-red-600"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {open ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <ul className="flex flex-col space-y-2 p-4 text-gray-900">
                      <li>
                        <a className="hover:underline">Home</a>
                      </li>
                      <li>
                        <a className="hover:underline">Shop</a>
                      </li>
                      <li>
                        <a className="hover:underline">BMI</a>
                      </li>
                      <li>
                        <a className="hover:underline">Appoinment</a>
                      </li>
                      <li>
                        <a className="hover:underline">Workouts</a>
                      </li>
                      <li>
                        <a className="hover:underline">Notification</a>
                      </li>
                      <li>
                        <a className="hover:underline">Profile</a>
                      </li>
                      <li>
                        <a className="hover:underline">Login</a>
                      </li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Headder;
