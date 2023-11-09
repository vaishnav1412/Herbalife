import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import admininstance from "../../Axios/adminAxiosConfig";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../../util/api";
const Adminprofile = () => {
  const [image, setImage] = useState("");
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();
  const id = admin._id;
  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("admin", admin._id);
      try {
        admininstance
          .post(apiEndPoints.uploadImage, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
              fetchUserDetails();
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
    }
  };

  useEffect(() => {
    uploadImage();
  }, [image]);

  const handleimage = async (event) => {
    setImage(event.target.files[0]);
  };
  const fetchUserDetails = async () => {
    try {
      admininstance.post(
       apiEndPoints.profileDetails,
        {},
        {
          headers: {
            Authorisation: "Bearer " + localStorage.getItem("admin_token"),
          },
        }
      )
      .then((response) => { 
        setAdmin(response.data.data);
      })
      .catch((error) => {
      
        toast.error('something went worng...');
      });

    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const addProfile = () => {
    navigate("/dashboard/addprofile", { state: { id } });
  };

  const editProfile = () => {
    navigate("/dashboard/editadminprofile", { state: { id } });
  };

  

  const navigateRoomCreate = () => {
    navigate("/dashboard/createroom");
  };

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <div className="bg-white shadow-lg p-3 lg:p-3">
        <div className="h-full bg-slate-700 p-3 mb-6">
          <div className="bg-white shadow-lg p-6 lg:p-3 hover:bg-slate-100">
            <div className="h-screen lg:h-auto w-full flex flex-col lg:flex-col">
              <div className="flex  space-x-2">
                <div className="mt-6 lg:mt-0 p-6 bg-white rounded-lg shadow-lg mb-4 p flex flex-col w-1/2">
                  <div className="w-40 h-40 bg-slate-400 rounded-full shadow-slate-700 mb-4 overflow-hidden">
                    <img src={`https://herbalproject.online/upload/${admin.image}`} />
                  </div>
                  <div>
                    <input
                      type="file"
                      id="fileInput"
                      class="absolute inset-0 opacity-0 cursor-pointer file"
                      onChange={handleimage}
                      hidden
                      pointer-events="none"
                    />
                    <label
                      for="fileInput"
                      class="flex items-center justify-center w-40 px-4 py-2 bg-slate-500 text-white rounded-md cursor-pointer border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition duration-300 ease-in-out "
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
                </div>

                <div className="mt-6 lg:mt-0 p-6 bg-white rounded-lg shadow-lg mb-4 p flex flex-col w-1/2">
                  <div class="flex justify-center align-middle">
                    <button
                      onClick={() => {
                        navigateRoomCreate();
                      }}
                      class="w-full px-4 py-2 bg-gray-800 hover:bg-gray-600 rounded-lg text-white mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          x="2"
                          y="3"
                          width="20"
                          height="14"
                          rx="2"
                          ry="2"
                        ></rect>
                        <polygon points="7 9 12 14 17 9"></polygon>
                      </svg>
                      Video Call
                    </button>
                   
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:mt-0 p-6 bg-white rounded-lg shadow-lg ">
                <h2 className="text-2xl font-semibold mb-4">
                  Profile Information
                </h2>
                <p className="text-gray-700 text-xl">
                  Name: <span className="font-bold">{admin?.name}</span> <br />
                  ROLE:{" "}
                  <span className="font-bold">
                    {admin?.role}({admin?.experience} Year expirience)
                  </span>{" "}
                  <br />
                  Qualification:{" "}
                  <span className="font-bold">{admin?.qulification}</span>{" "}
                  <br />
                </p>
                {admin.role ? (
                  <button
                    className="w-40 h-10 bg-black text-white rounded-md shadow-lg hover:bg-slate-700 "
                    onClick={() => {
                      editProfile();
                    }}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    className="w-40 h-10 bg-black text-white rounded-md shadow-lg hover:bg-slate-700 "
                    onClick={() => {
                      addProfile();
                    }}
                  >
                    Add Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminprofile;
