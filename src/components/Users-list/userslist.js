import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import admininstance from "../../Axios/adminAxiosConfig";
import { apiEndPoints } from "../../util/api";

const Users = () => {
  const [user, setuser] = useState([]);

  const getData = async (req, res) => {
    admininstance
      .post(apiEndPoints.userlists)
      .then((response) => {
        setuser(response.data.data);
      })
      .catch((error) => {
        toast.error("something went worng...");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleBlock = async (email, status) => {
    try {
      const formData = {
        email,
      };
      if (status === 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "you want to block the user...?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, block user!",
          footer: '<a href="#">Learn more about blocking user</a>',
          customClass: "swal-block-user",
        }).then(async (result) => {
          if (result.isConfirmed) {
            admininstance
              .post(apiEndPoints.blockuser, formData)
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
          }
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "you want to un-block the user...?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,un block user!",
          footer: '<a href="#">Learn more about un blocking user</a>',
          customClass: "swal-un-block-user",
        }).then(async (result) => {
          if (result.isConfirmed) {
            admininstance
              .post(apiEndPoints.unBlockUser, formData)
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
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="p-5 h-screen bg-gray-200">
        <h1 className="text-2xl mb-2">Users List</h1>
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-700">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                NO
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Age
              </th>

              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.map((items, index) => {
              return (
                <tr className="bg-gray-300 border-b-2 border-gray-700 ">
                  <td className="p-3 text-sm  text-blue-600">{index + 1}</td>
                  <td className="p-3 text-sm text-gray-700">{items?.name}</td>
                  <td className="p-3 text-sm text-gray-700">{items?.age}</td>
                  <td className="p-3 text-sm text-gray-700">{items?.email}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {items.isBlock === 0 ? "Active" : "Blocked"}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    <button
                      className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300"
                      onClick={() => {
                        handleBlock(items.email, items.isBlock);
                      }}
                    >
                      {items.isBlock === 0 ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
