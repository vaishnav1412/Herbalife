import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";
const images = require("../../assets/other/profile.png");

const UserProfile = () => {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState("");

  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const id = user._id;
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      instance
        .post(
          apiEndPoints.userProfileDetails,
          {},
          {
            headers: {
              Authorisation: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          dispatch(hideLoading());
          if (response.data.success) {
            setUser(response.data.data);
            setAddress(response.data.data2.addresses);
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
        });
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching user details", error);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("user", user._id);
      try {
        dispatch(showLoading());
        instance
          .post(apiEndPoints.userUploadImage, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            dispatch(hideLoading());

            if (response.data.success) {
              toast.success(response.data.message);
              fetchUserDetails();
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            dispatch(hideLoading());
            toast.error("something went worng...");
          });
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    }
  };

  useEffect(() => {
    uploadImage();
  }, [image]);

  const handleimage = async (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleAddress = async (req, res) => {
    navigate("/user/addaddress", { state: { id } });
  };
  const upgrade = () => {
    navigate("/user/premiumuser");
  };
  const handleEditProfile = () => {
    navigate("/user/editprofile");
  };
  const primeDetails = async () => {
    const formData = {
      id,
    };
    if (formData) {
      instance
        .post(apiEndPoints.planData, formData)
        .then((response) => {
          if (response.data.success) {
            setPlan(response.data.data);
          }
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
    }
  };

  useEffect(() => {
    primeDetails();
  }, [user]);

  const orderHistory = () => {
    navigate("/user/orderhistory");
  };
  const subscriptionHistory = () =>{
    navigate("/user/subscriptionhistory")
  }


  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }
    const originalDate = new Date(dateString);
    const formattedDate = originalDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  };
   
  return (
    <div className="p-4 bg-black">
      <div className="h-screen w-full bg-slate-300 p-4 flex flex-col lg:flex-row">
        <div className="w-full lg:w-72 bg-white h-auto shadow-lg mx-0 lg:mr-4 flex flex-col items-center py-6 ">
          <div className="w-40 h-40 bg-slate-400 rounded-full shadow-slate-700 mb-4 overflow-hidden">
            <img
              className=""
              src={
                !user.image
                  ? images
                  : `https://herbalproject.online/upload/${user.image}`
              }
              alt="User Profile"
            />
          </div>
          <div className="flex">
            {" "}
            <h2 className="font-bold text-center text-xl mb-2">{user.name}</h2>
            {user.isPrime === 1 && (
              <img
                src="https://png.pngtree.com/template/20210307/ourmid/pngtree-premium-quality-logo-design-image_496628.jpg"
                className="h-9 w-9"
              />
            )}
          </div>

          <div class="relative p-4">
            <input
              type="file"
              id="fileInput"
              class="absolute inset-0 opacity-0 cursor-pointer file"
              onChange={handleimage}
            />
            <label
              for="fileInput"
              class="flex items-center justify-center w-full px-4 py-2 bg-slate-500 text-white rounded-md cursor-pointer border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mr-2 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Choose a file
            </label>
          </div>

          <div className="flex justify-center mb-3">
            <button
              className="w-40 h-10 bg-black text-white rounded-md shadow-lg hover:bg-slate-700 "
              onClick={() => {
                handleEditProfile();
              }}
            >
              Edit Profile
            </button>
          </div>
          <div className="flex justify-center mb-3">
            {address[0]?.name ? (
              <button
                className="w-40 h-10 bg-black text-white rounded-md shadow-lg hover:bg-slate-700 "
                onClick={() => {
                  navigate("/user/editaddress");
                }}
              >
                Edit Address
              </button>
            ) : (
              <button
                className="w-40 h-10 bg-black text-white rounded-md shadow-lg hover:bg-slate-700"
                onClick={() => {
                  handleAddress();
                }}
              >
                Add Address
              </button>
            )}
          </div>
          <div className="flex justify-center mb-3">
            <button
              className="w-40 h-10 bg-black text-white rounded-md shadow-lg  hover:bg-slate-700"
              onClick={() => {
                orderHistory();
              }}
            >
              Order History
            </button>
          </div>
          <div className="flex justify-center mb-3">
            <button
              className="w-40 h-10 bg-orange-500 text-white rounded-md shadow-lg hover:bg-amber-500"
              onClick={() => {
                upgrade();
              }}
            >
              Upgrade
            </button>
          </div>
          <div className="flex justify-center ">
            <button
              className="w-40 h-10 bg-black text-white rounded-md shadow-lg  hover:bg-slate-700"
              onClick={() => {
                subscriptionHistory();
              }}
            >
             Subscription History
            </button>
          </div>
        </div>
        <div className="w-full bg-white shadow-lg p-4 lg:p-4">
          <div className="h-full w-full bg-slate-700 p-3 mb-4">
            <div className="w-full bg-white shadow-lg p-4 lg:p-4 hover:bg-slate-100">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Profile Information
                </h2>
                <p className="text-gray-700">
                  BMI Result: <span className="font-bold">{user?.bmi}</span>{" "}
                  <br />
                  Email: <span className="font-bold">{user?.email}</span> <br />
                </p>
                {user.isPrime === 1 && (
                  <>
                    <h1 className="text-2xl font-semibold mb-4 text-emerald-500">
                      Plan Details
                    </h1>
                    <p>
                      {" "}
                      Start Date:
                      <span className="font-bold text-orange-500">
                      {formatDate(plan?.startDate)}
                      </span>{" "}
                      <br />
                      End Date:{" "}
                      <span className="font-bold text-orange-500">
                      {formatDate(plan?.endDate)}
                      </span>{" "}
                      <br />
                    </p>
                  </>
                )}
              </div>
            </div>  

            <div className="w-full bg-white shadow-lg p-4 lg:p-4  hover:bg-slate-100">
              <div className="p-6 bg-white rounded-lg shadow-lg ">
                <h2 className="text-2xl font-semibold mb-4">Address</h2>
                <p className="text-gray-700">
                  {address[0]?.name}, <br />
                  {address[0]?.place},{address[0]?.district}
                  <br />
                  Postal Code:{address[0]?.pin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
