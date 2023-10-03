import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "../../Axios/axiosConfig";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const id = user._id;
  const [notification, setNotification] = useState("");
  const [adminLive, setAdminLive] = useState("");
  const [admin, setadmin] = useState("");
  const navigate = useNavigate();

  const live = () => {
    dispatch(showLoading());
    instance
      .post("/api/user/videocallnotification")
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.success) {
          setAdminLive(response.data.message);
          setadmin(response.data.data);
        } else {
          setAdminLive("");
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error("something went worng...");
      });
  };

  const getPlanDetails = async () => {
    const formData = {
      id,
    };
    if (formData) {
      dispatch(showLoading());
      instance
        .post("/api/user/plannotification", formData)
        .then((response) => {
          dispatch(hideLoading());
          if (response.data.success) {
            setNotification(response.data.message);
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
          toast.error("something went worng...");
        });
    }
  };

  const getData = async () => {
    dispatch(showLoading());
    instance
      .post("/api/user/profiledetails")
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          console.error("Error fetching user details");
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error("something went worng...");
      });
  };

  useEffect(() => {
    getData();
    live();
  }, []);

  useEffect(() => {
    getPlanDetails();
  }, [user]);
  return (
    <div class="max-w-lg mx-auto items-center h-screen ">
      {notification && (
        <div
          onClick={() => {
            navigate("/user/premiumuser");
          }}
          class="flex justify-between px-3 py-1 bg-slate-100 items-center gap-1 rounded-lg border border-gray-300 my-3 shadow-xl"
        >
          <div class="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
              <img
                class="w-full h-full object-cover rounded-full"
                src="https://png.pngtree.com/template/20210307/ourmid/pngtree-premium-quality-logo-design-image_496628.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <span class="font-mono">{notification}</span>
          </div>
        </div>
      )}

      {adminLive && (
        <div
          onClick={() => {
            navigate("/user/videocallroom");
          }}
          class="flex justify-between px-3 py-1 bg-slate-100 items-center gap-1 rounded-lg border border-gray-300 my-3  shadow-xl"
        >
          <div class="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
              <img
                class="w-full h-full object-cover rounded-full"
                src={`http://localhost:5000/upload/${admin.image}`}
                alt=""
              />
            </div>
          </div>
          <div>
            <span class="font-mono">{adminLive}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
