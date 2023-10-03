import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import admininstance from "../../Axios/adminAxiosConfig";
import toast from "react-hot-toast";

const Details = () => {
  const { state } = useLocation();
  const id = state && state.id;
  const [plan, setPlan] = useState(null); // Initialize plan as null

  const getData = () => {
    try {
      const formdata = {
        id
      };
      if (formdata) {
        admininstance
          .post("/api/admin/subscriptionadminsidesingledata", formdata)
          .then((response) => {
            if (response.data.success) {
              setPlan(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error("something went wrong...");
          });
      } else {
        toast.error("something went wrong---");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="w-5/6 h-5/6 rounded-xl container bg-slate-400">
        <div className="m-10">
          <span className="bg-slate-900 rounded-md p-2 text-white font-serif">
            Subscription History
          </span>
        </div>

        <div className="h-96 overflow-y-scroll p-4">
         {plan?.map((plan,index)=>{
            return(<div key={index} className="bg-slate-50 grid grid-cols-3 gap-4 items-center m-2 cursor-pointer hover:shadow-2xl border-2 rounded-lg p-6">
             
              <div>
                <span className="font-bold font-mono">Amount : </span>{" "}
                {plan.amount}
              </div>
              <div>
                <span className="font-bold font-mono">PurchaseDate : </span>{" "}
                {plan.purchaseDate}
              </div>
              <div>
                <span className="font-bold font-mono">OrderId : </span>{" "}
                {plan.orderId}
              </div>
            </div>)
         })}
        </div>
      </div>
    </div>
  );
};

export default Details;
