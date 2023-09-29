import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import admininstance from "../../Axios/adminAxiosConfig";
const AdminSideOrders = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const getData = async (req, res) => {
    try {
      admininstance
        .post("/api/admin/displayorders")
        .then((response) => {
          if (response.data.success) {
            setOrder(response.data.data);
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

  const maxAddressLength = 15;
  const showProduct = (id) => {
    navigate(`/dashboard/orderdproduct/${id}`);
  };

  const changeStatus = async (id) => {
    try {
      const formData = {
        id,
      };
      admininstance
        .post("/api/admin/changestatus", formData)
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className="p-5  bg-gray-200">
          <h1 className="text-2xl mb-2">Orders</h1>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  NO
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Coustomer Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Address
                </th>

                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  total amount
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  status
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  date
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  products
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {order.map((items, index) => {
                // Shortened address
                const shortenedAddress =
                  items.deliveryAddress.length > maxAddressLength
                    ? items.deliveryAddress.substring(0, maxAddressLength) +
                      "..."
                    : items.deliveryAddress;

                return (
                  <tr key={index}>
                    <td className="p-3 text-sm text-blue-600">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {items.userName}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {showMore ? items.deliveryAddress : shortenedAddress}
                      {items.deliveryAddress.length > maxAddressLength && (
                        <button
                          onClick={toggleShowMore}
                          className="text-blue-600 hover:underline focus:outline-none"
                        >
                          {showMore ? "View Less" : "View More"}
                        </button>
                      )}
                    </td>

                    <td className="p-3 text-sm text-gray-700">
                      {items.totalAmount}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {items.status}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {new Date(items.date).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <button
                        onClick={() => {
                          showProduct(items._id);
                        }}
                        className="rounded-full bg-yellow-400 px-3 text-center text-white hover:bg-slate-300"
                      >
                        view
                      </button>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <button
                        onClick={() => {
                          changeStatus(items._id);
                        }}
                        className={`rounded-full px-3 text-center text-white hover:bg-slate-300 ${
                          items.status === "Pending"
                            ? "bg-red-600"
                            : items.status === "Placed"
                            ? "bg-blue-600"
                            : items.status === "Delivered"
                            ? "bg-green-600"
                            : ""
                        }`}
                      >
                        {items.status}
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

export default AdminSideOrders;
