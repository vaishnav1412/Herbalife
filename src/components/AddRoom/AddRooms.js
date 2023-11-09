import React, { useCallback, useEffect, useState } from "react";
import admininstance from "../../Axios/adminAxiosConfig";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { apiEndPoints } from "../../util/api";
import { useNavigate } from "react-router-dom";

const AddRooms = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const setId = (event) => {
    setRoomId(event.target.value);
  };

  const navigateToAdminVideocallUi = useCallback(async () => {
    const formData = {
      roomId,
    };

    admininstance
    .post(apiEndPoints.roomCheck, formData)
    .then((response) => {
      if (response.data.success) {
        navigate(`/dashboard/adminvideocall/${roomId}`);
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      toast.error("something went worng...");
    });
   
  }, [roomId]);

  const handleCreateRoom = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmit = async (event) => {
    let isVarified = true;
    if (room.length < 8) {
      console.log("hai..");
      isVarified = false;
      setError("Room Id must be 8 Numbers");
    }
    if (isVarified) {
      const formData = {
        room,
      };
      if (formData) {

        admininstance
        .post(apiEndPoints.addRoom, formData)
        .then((response) => {
          if (response.data.success) {
            getData();
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
      } else {
        toast.error("something went wrong...");
      }
    } else {
      toast.error("something went wrong...");
    }
  };

  const deleteRoom = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to delete the room...?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete room!",
      footer: '<a href="#">Learn more about deleting room</a>',
      customClass: "swal-delete-room",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          admininstance
            .post(apiEndPoints.deleteRoom)
            .then((response) => {
              if (response.data.success) {
                setData("");
                toast.success(response.data.message);
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.error("something went worng...");
            });
        } catch (error) {
          toast.error("Something went wrong...");
        }
      }
    });
  };


  const getData = async () => {
    try {
      admininstance
      .post(apiEndPoints.findRoomId)
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("something went worng...");
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" p-5">
      <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
        <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
          <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
            <span className="block mb-2 dark:text-violet-400">
              Hebal Nutrition
            </span>
            <h1 className="text-5xl font-extrabold dark:text-gray-50">
              Build it for live Coaching
            </h1>

            <p className="my-8">
              <span className="font-medium dark:text-gray-50">
                Room Id will be Given below.
              </span>{" "}
              Use the Room Id To enter the Website.
            </p>
            <div class="flex rounded-md shadow-sm p-3">
              <input
                onChange={handleCreateRoom}
                type="text"
                id="hs-trailing-button-add-on-multiple-add-ons"
                name="hs-trailing-button-add-on-multiple-add-ons"
                class="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              />

              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="button"
                class="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              >
                Create
              </button>
            </div>
            <p className="text-red-600">{error}</p>
            <div className="mb-3">
              <label for="lastname" className="text-sm sr-only">
                Room Code
              </label>
              <input
                value={data}
                type="text"
                className="w-2/4 rounded-md  text-black"
              />
            </div>
            <div className="mb-3">
              <label for="lastname" className="text-sm sr-only">
                Room Code
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter Room Id"
                onChange={setId}
                className="w-full h-8 rounded-md focus:ring text-black focus:ri dark:border-gray-700"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                navigateToAdminVideocallUi();
              }}
              className="w-full py-2 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
            >
              Join the Room
            </button>

            <button
              type="button"
              onClick={() => {
                deleteRoom();
              }}
              className="w-full py-2 font-semibold rounded dark:bg-red-500 mt-2 dark:text-gray-900"
            >
              Delete Room
            </button>
          </div>
          <img
            src="https://www.reviews.org/app/uploads/2020/05/Woman-on-a-video-conference-call-1.jpg"
            alt=""
            className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"
          />
        </div>
      </section>
    </div>
  );
};

export default AddRooms;
