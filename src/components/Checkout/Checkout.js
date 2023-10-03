import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState([]);
  const [cart, setCart] = useState("");
  const [order, setOrder] = useState("");
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = cart?.userId;

  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post("/api/user/fetchcartdetails");
      dispatch(hideLoading());
      if (response.data.success) {
        setList(response.data.data.products);
        setCart(response.data.data);
        setTotalPrice(response.data.total);
        setAddresses(response.data.address);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const deleteAddress = async (addressId) => {
    try {
      const formData = {
        addressId,
        id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "you want to delete this address?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        footer: '<a href="#">Learn more about delete address</a>',
        customClass: "swal-delete-address",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (addressId && id) {
            const response = await instance.post(
              "/api/user/deleteaddress",
              formData
            );

            if (response.data.success) {
              fetchUserDetails();
            } else {
              toast.error(response.data.message);
            }
          } else {
            toast.error("something went wrong...");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editAddress = async (addressId, id) => {
    const stateObject = {
      addressId,
      id,
    };

    navigate("/user/checkouteditaddress", { state: { stateObject } });
  };

  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId);
  };
  const payment = async () => {
    const formData = {
      selectedAddress,
      id,
    };
    try {
      const response = await instance.post("/api/user/productpurchase", formData);
      if (response.data.success) {
        toast.success(response.data.message);

        setOrder(response.data.order);
        console.log(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyPayment = async (response, order) => {
    const orderId = order.id;

    const formData = {
      orderId,
      id,
    };
    try {
      const response = await instance.post(
        "/api/user/verifyproductpayment",
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/user/sucess");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function razorpayPayment(order) {
    var options = {
      key: "rzp_test_KgphPCgit7FD2N",
      amount: order.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response) {
        verifyPayment(response, order);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  useEffect(() => {
    if (order) {
      razorpayPayment(order);
    }
  }, [order]);

  return (
    <div className="p-5 bg-white">
      <div class="h-screen grid grid-cols-3">
        <div class="lg:col-span-2 col-span-3 bg-gray-200 space-y-4 px-12">
          <div class="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div class="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              Complete your shipping and payment details below.
            </div>
            <div class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <div class="rounded-md">
            <section>
              <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping & Billing Information
              </h2>
              <div className="flex space-x-5 align-middle justify-center">
                <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-gradient-to-tr from-gray-500 to-gray-600 bg-clip-border p-4 text-white shadow-md shadow-black-500/40">
                  <div className="relative m-0 mb-8 overflow-hidden rounded-none border-b border-white/10 bg-transparent bg-clip-border pb-4 text-center text-gray-700 shadow-none flex ">
                    <p className="block font-sans text-sm font-normal uppercase leading-normal text-white antialiased">
                      Delivery Address
                    </p>
                    <br />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 absolute top-2 right-2"
                      onClick={() => {
                        navigate("/user/addcheckoutaddress", { state: { id } });
                      }}
                    >
                      Add Address
                    </button>
                  </div>
                  <div className="p-2">
                    <ul className="flex flex-col gap-2">
                      {addresses?.map((address, index) => (
                        <li
                          className={`flex items-center gap-2 cursor-pointer ${
                            selectedAddress === address?._id
                              ? "bg-gray-700 text-white"
                              : "hover:bg-gray-700 hover:text-white"
                          }`}
                          key={address?._id}
                          onClick={() => handleAddressChange(address?._id)}
                        >
                          <div>
                            <input
                              type="radio"
                              id={`address${index}`}
                              name="deliveryAddress"
                              className="hidden"
                              value={address._id}
                              checked={selectedAddress === address?._id}
                              onChange={handleAddressChange}
                            />
                            <label
                              htmlFor={`address${index}`}
                              className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased"
                            >
                              {address?.name}, {address?.place},{" "}
                              {address?.district}, {address?.pin}
                            </label>
                          </div>
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            onClick={() => {
                              editAddress(address?._id, id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            onClick={() => {
                              deleteAddress(address?._id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 p-0">
                    <p className="font-semibold">
                      Selected Address:{" "}
                      {
                        addresses?.find(
                          (address) => address?._id === selectedAddress
                        )?.name
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="col-span-1 bg-gray-300 lg:block hidden">
          <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul class="py-6 border-b space-y-6 px-8">
            {list.map((list, index) => {
              return (
                <li class="grid grid-cols-6 gap-2 border-b-1">
                  <div class="col-span-1 self-center">
                    <img
                      src={`http://localhost:5000/upload/${list?.image}`}
                      alt="Product"
                      class="rounded w-full"
                    />
                  </div>
                  <div class="flex flex-col col-span-3 pt-2">
                    <span class="text-gray-600 text-md font-semi-bold">
                      {list?.name}
                    </span>
                    <span class="text-gray-400 text-sm inline-block pt-2">
                      {list?.catogory === "1" ? "Gain" : "Lose"}
                    </span>
                  </div>
                  <div class="col-span-2 pt-3">
                    <div class="flex items-center space-x-2 text-sm justify-between">
                      <span class="text-gray-400">
                        {list?.count}x₹{list?.price}
                      </span>
                      <span class="text-pink-400 font-semibold inline-block">
                        {" "}
                        ₹{list?.count * list?.price}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div class="px-8 border-b">
            <div class="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span class="font-semibold text-pink-500"> ₹{totalPrice}</span>
            </div>
            <div class="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span class="font-semibold text-pink-500">Free</span>
            </div>
          </div>
          <div class="font-semibold text-xl px-8 flex justify-between py-4 text-gray-600">
            <span>Total</span>
            <span> ₹{totalPrice}</span>
          </div>
          <div
            className=" w-full flex align-middle justify-center"
            onClick={() => {
              payment();
            }}
          >
            <button class="submit-button px-4 py-3 rounded-full bg-violet-500 text-white focus:ring focus:outline-none w-2/4 text-xl items-center font-semibold transition-colors">
              Pay ₹{totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
