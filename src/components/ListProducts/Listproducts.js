import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import admininstance from "../../Axios/adminAxiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiEndPoints } from "../../util/api";
const Listproducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      admininstance
        .post(apiEndPoints.AdminListProduct)
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data);
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
  const handleBlock = async (id, status) => {
    try {
      const formData = {
        id,
      };
      if (status === 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "you want to block the product?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, block it!",
          footer: '<a href="#">Learn more about block product</a>',
          customClass: "swal-block-product",
        }).then(async (result) => {
          if (result.isConfirmed) {
            admininstance
              .post(apiEndPoints.blockPoducts, formData)
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
          text: "you want to un block the product?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,un block it!",
          footer: '<a href="#">Learn more about un block product</a>',
          customClass: "swal-un block-product",
        }).then(async (result) => {
          if (result.isConfirmed) {
            admininstance
              .post(apiEndPoints.unBlockProduct, formData)
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
  const handleEditProduct = async (id) => {
    navigate("/dashboard/editproducts", { state: { id } });
  };
  return (
    <div className="w-full">
      <div className="p-5 h-full bg-gray-200">
        <h1 className="text-2xl  mb-2">Product List</h1>
        <button className="rounded-full bg-gray-800 px-3 text-center text-white hover:bg-slate-300 m-4">
          <a href="/dashboard/addproducts">Add Products</a>
        </button>
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-700">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                NO
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Products Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Price
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Catogory
              </th>

              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Quantity
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                stock
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Description
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Image
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Action1
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Action2
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((items, index) => {
              return (
                <tr className="bg-gray-300 border-b-2 border-gray-700 ">
                  <td className="p-3 text-sm  text-blue-600">{index + 1}</td>
                  <td className="p-3 text-sm text-gray-700">{items?.name}</td>
                  <td className="p-3 text-sm text-gray-700">{items?.price}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {items?.catogory === "1" ? "Gain" : "Lose"}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {items?.quantity}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{items?.stock}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {items?.description}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {" "}
                    <img
                      src={`https://herbalproject.online/upload/${items?.image}`}
                      alt={`Banner ${index + 1}`}
                      className="max-w-full h-10 w-10"
                    />
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {items?.isBlock === 0 ? "Active" : "Blocked"}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    <button
                      className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300"
                      onClick={() => {
                        handleBlock(items?._id, items?.isBlock);
                      }}
                    >
                      {items?.isBlock === 0 ? "Block" : "Unblock"}
                    </button>
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    <button
                      className="rounded-full bg-zinc-700 px-3 text-center text-white hover:bg-slate-300"
                      onClick={() => {
                        handleEditProduct(items?._id);
                      }}
                    >
                      Edit Products
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

export default Listproducts;
