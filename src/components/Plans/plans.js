import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import admininstance from "../../Axios/adminAxiosConfig";
const Plans = () => {
  const [list, setList] = useState([]);

  const deletePlan = async (id) => {
    try {
      const formData = {
        id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "you want to delete the plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        footer: '<a href="#">Learn more about delete plan</a>',
        customClass: "swal-delete-plan",
      }).then(async (result) => {
        if (result.isConfirmed) {
          admininstance
            .post("/api/admin/deleteplan", formData)
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
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      admininstance
        .post("/api/admin/planlist")
        .then((response) => {
          setList(response.data.data);
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
    <div>
      <div className="w-full">
        <div className="p-5 h-screen bg-gray-200">
          <h1 className="text-2xl  mb-2">Plans List</h1>
          <button className="rounded-full bg-gray-800 px-3 text-center text-white hover:bg-slate-300 m-4">
            <a href="/dashboard/addplan">Add Plan</a>
          </button>
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
                  Price
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Duration
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Features
                </th>

                <th className=" w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((list, index) => {
                return (
                  <tr className="bg-gray-300  border-b-2 border-gray-700">
                    <td className="p-3 text-sm text-blue-600">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">{list?.name}</td>
                    <td className="p-3 text-sm text-gray-700">{list?.price}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {list?.duration}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {list?.features}
                    </td>

                    <td className="p-3 text-sm text-gray-700">
                      <button
                        className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300"
                        onClick={() => {
                          deletePlan(list?._id);
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

export default Plans;
