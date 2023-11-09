import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";


const Subscription = () => {
  const [plan, setPlan] = useState([]);
  const [user, setUser] = useState("");
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const id = user._id;

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.userPlanList);
      dispatch(hideLoading());
      setPlan(response.data.data);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        dispatch(showLoading());
        const response = await instance.post(apiEndPoints.userProfileDetails);
        setUser(response.data.data);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const purchase = async (plan) => {
    const formData = {
      plan,
      id,
    };
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.planPurchase, formData);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);

        setOrder(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  const verifyPayment = async () => {
    const formData = {
      id,
    };
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.planVerifyPayment, formData);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/user/userprofile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
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

  console.log(order);
  useEffect(() => {
    if (order) {
      razorpayPayment(order);
    }
  }, [order]);

  return (
    <div>
      <section className="py-6 dark:bg-gray-300 dark:text-gray-100">
        <div className="container p-4 mx-auto sm:p-10">
          <div className="mb-5 space-y-4 text-center">
            <h1 className="text-4xl font-semibold leadi text-zinc-700 from-stone-800">
              Select Your Magic Plan
            </h1>
          </div>
          <div className="grid max-w-lg grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-4 lg:max-w-full ">
            {plan.map((plan) => {
              return (
                <div className=" flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-violet-200">
                  <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 dark:bg-gray-800">
                    <p className="text-lg font-medium">{plan.name}</p>
                    <p className="text-5xl font-bold">
                      {plan.price}€
                      <span className="text-xl dark:text-gray-400">
                        /{plan.duration}mo
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center px-2 py-8 dark:bg-gray-900">
                    <ul className="self-stretch flex-1 space-y-2">
                      <li className="flex justify-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 dark:text-violet-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          ></path>
                        </svg>
                        <span>{plan.features[0]}</span>
                      </li>
                      <li className="flex justify-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 dark:text-violet-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          ></path>
                        </svg>
                        <span>{plan.features[1]}</span>
                      </li>
                      <li className="flex justify-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 dark:text-violet-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          ></path>
                        </svg>
                        <span>{plan.features[2]}</span>
                      </li>
                      <li className="flex justify-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 dark:text-violet-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          ></path>
                        </svg>
                        <span>{plan.features[3]}</span>
                      </li>
                    </ul>
                    <button
                      className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12 dark:bg-violet-400 dark:text-gray-900 hover:bg-violet-500"
                      onClick={() => {
                        purchase(plan._id);
                      }}
                    >
                      Buy Plan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
