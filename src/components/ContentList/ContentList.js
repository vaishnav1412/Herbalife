import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import admininstance from "../../Axios/adminAxiosConfig";

const ListContent = () => {
  const [content, setContent] = useState([]);
  const getData = async () => {
    admininstance
      .post("/api/admin/contentlist")
      .then((response) => {
        if (response.data.data) {
          setContent(response.data.data);
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

  const deleteContent = async (id) => {
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
        footer: '<a href="#">Learn more about deleting content</a>',
        customClass: "swal-delete-content",
      }).then(async (result) => {
        if (result.isConfirmed) {
          admininstance
            .post("/api/admin/deletecontent", formData)
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

  console.log(content);
  return (
    <div>
      <div className="w-full">
        <div className="p-5 h-screen bg-gray-200">
          <h1 className="text-2xl  mb-2">Content List</h1>
          <button className="rounded-full bg-gray-800 px-3 text-center text-white hover:bg-slate-300 m-4">
            <a href="/dashboard/addcontent">Add Content</a>
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
                  Description
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
              {content?.map((items, index) => {
                return (
                  <tr className="bg-gray-300  border-b-2 border-gray-700">
                    <td className="p-3 text-sm text-blue-600">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">{items.title}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {items.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {" "}
                      <img src={items.image} className="max-w-full h-10 w-10" />
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <button
                        className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300"
                        onClick={() => {
                          deleteContent(items._id);
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

export default ListContent;
