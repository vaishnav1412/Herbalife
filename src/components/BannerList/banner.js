import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import admininstance from "../../Axios/adminAxiosConfig";
const Banner = () => {
  const [banner, setBanner] = useState([]);
  const getData = async () => {
    admininstance
      .post("/api/admin/bannerlist")
      .then((response) => {
        if (response.data.data) {
          setBanner(response.data.data);
        } else {
          toast("something went worng");
        }
      })
      .catch((error) => {
        toast.error("something went worng...");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteBanner = async (id) => {
    const title = id;
    const formData = {
      title,
    };
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You cannot undo this action.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        footer: '<a href="#">Learn more about deleting banner</a>',
        customClass: "swal-delete-banner",
      }).then(async (result) => {
        if (result.isConfirmed) {
          admininstance
            .post("/api/admin/deletebanner", formData)
            .then((response) => {
              if (response.data.success) {
                toast.success(response.data.message);
                getData();
              } else {
                toast("something went worng");
              }
            })
            .catch((error) => {
              toast.error("something went worng...");
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-full">
        <div className="p-5 h-screen bg-gray-200">
          <h1 className="text-2xl  mb-2">Banners List</h1>
          <button className="rounded-full bg-gray-800 px-3 text-center text-white hover:bg-slate-300 m-4">
            <a href="/dashboard/addbanner">Add Banner</a>
          </button>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  NO
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Title
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Image
                </th>
                <th className=" w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {banner?.map((items, index) => {
                return (
                  <tr className="bg-gray-300  border-b-2 border-gray-700">
                    <td className="p-3 text-sm text-blue-600">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {items?.title}
                    </td>

                    <td className="p-3 text-sm text-gray-700">
                      {" "}
                      <img
                        src={`http://localhost:5000/upload/${items.image}`}
                        alt={`Banner ${index + 1}`}
                        className="max-w-full h-10 w-10"
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <button
                        className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300"
                        onClick={() => {
                          deleteBanner(items._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Banner;
