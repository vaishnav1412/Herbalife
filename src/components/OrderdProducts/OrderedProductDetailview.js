import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";
import admininstance from "../../Axios/adminAxiosConfig";

const OrderedProductDetailview = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const getData = async (id) => {
    try {
      const formData = {
        id,
      };
      admininstance
        .post(apiEndPoints.fetchSingleOrder, formData)
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data[0].products);
          } else {
            toast.error("Something went wrong...");
          }
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);
  console.log(products);
  return (
    <div className="p-4">
      <div className="col-span-1 bg-gray-500 lg:block hidden">
        <h1 className="py-6 border-b-2 text-xl text-white px-8">
          Ordered Products
        </h1>

        <ul className="py-6 border-b space-y-6 px-8">
          {products?.map((product, index) => (
            <li key={index} className="grid grid-cols-6 gap-2 border-b-1">
              <div className="col-span-1 self-center">
                <img
                  src={`https://herbalproject.online/upload/${product?.image}`}
                  alt={product?.name} 
                  className="rounded w-14 h-14"
                />
              </div>
              <div className="flex flex-col col-span-3 pt-2">
                <span className="text-white text-sm inline-block pt-2">
                  {product?.name}
                </span>
              </div>
              <div className="col-span-2 pt-3">
                <div className="flex items-center space-x-2 text-sm justify-between">
                  <span className="text-white">
                    {product?.count} x ₹{product?.productPrice}
                  </span>
                  <span className="text-yellow-200 font-semibold inline-block">
                    ₹{product?.count * product?.productPrice}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-8 border-b">
          <div className="flex justify-between py-4 text-white">
            <span>Subtotal</span>
            <span className="font-semibold text-yellow-300">
              ₹
              {products.reduce(
                (total, product) =>
                  total + product.count * product.productPrice,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between py-4  text-white">
            <span>Shipping</span>
            <span className="font-semibold text-yellow-300">Free</span>
          </div>
        </div>

        <div className="w-full h-2 bg-white"></div>
      </div>
    </div>
  );
};

export default OrderedProductDetailview;
