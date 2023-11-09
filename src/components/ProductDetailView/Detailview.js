import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";

const Detailview = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const location = useLocation();
  const productId = location.state.productId;
  const id = user?._id;

  const fetchProduct = async () => {
    try {
      const formData = {
        productId,
      };
      if (productId) {
        const response = await instance.post(
         apiEndPoints.userfetchProduct,
          formData
        );

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await instance.post(apiEndPoints.userProfileDetails);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchProduct();
  }, []);

  const addToCart = async (productId, id) => {
    try {
      if (productId && id) {
        const formData = {
          productId,
          id,
        };

        if (formData) {
          const response = await instance.post(apiEndPoints.userAddToCart, formData);
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error("something went wrong..");
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <section class="text-gray-700 body-font overflow-hidden bg-slate-300 shadow-xl">
        <div class="container px-5 py-16 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={`https://herbalproject.online/upload/${product[0]?.image}`}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-2 mt-2 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {product[0]?.name}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <button class="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  <span class="text-gray-600 ml-3">
                    {product[0]?.catogory === "1"
                      ? "Weight Gain prouct"
                      : "Weight Lose prouct"}
                  </span>
                </span>
              </div>
              <p class="leading-relaxed">{product[0]?.description}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div class="flex">
                  <span class="mr-3">Quantity : {product[0]?.quantity}</span>
                  <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  ${product[0]?.price}
                </span>
                <button
                  class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={() => {
                    addToCart(product[0]?._id, id);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detailview;
