import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";

const Subscriptions = () => {
  const [plan, setPlan] = useState([]);

  const fetchData = () => {
    try {
      instance
        .post("/api/user/fetchsubscriptionhistory")
        .then((response) => {
          if (response.data.success) {
            setPlan(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="w-5/6 h-5/6 rounded-xl  container  bg-slate-400">
        <div className="m-10">
          <span className="bg-slate-900 rounded-md p-2 text-white font-serif">
            Subscription History
          </span>
        </div>

        <div className=" h-96 overflow-y-scroll p-4  ">
          {plan.map((items, index) => {
            return (
              <div
                key={index}
                className=" bg-slate-50   grid grid-cols-3 gap-4 items-center m-2 cursor-pointer hover:shadow-2xl  border-2 rounded-lg p-6"
              >
                <div className="">
                  <span className="font-bold font-mono">Amount : </span>{" "}
                  {items.amount}
                </div>
                <div className="">
                  <span className="font-bold font-mono">PurchaseDate : </span>{" "}
                  {items.purchaseDate}
                </div>

                <div className="">
                  <span className="font-bold font-mono">OrderId : </span>{" "}
                  {items.orderId}
                </div>
              </div>
            );
          })}
        </div>
      </div>
            
    </div>
  );
};

export default Subscriptions;
