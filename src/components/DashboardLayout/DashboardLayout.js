import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import admininstance from "../../Axios/adminAxiosConfig";
import { apiEndPoints } from "../../util/api";
const DashboardLayout = () => {
  const [user, setUser] = useState(0);
  const [primeUser, setPrimeUser] = useState(0);
  const [NormalUser, setNormalUser] = useState(0);
  const [order, setOrder] = useState(0);

const [shopEarning, setShopEarning] = useState(0);
const [primeEarning, setPrimeEarning] = useState(0);
  const getData = async () => {
    try {
      admininstance.post(apiEndPoints.dashboardDetails)
      .then((response) => {
        if (response.data.success) {
            setUser(response.data.data1);
            setPrimeUser(response.data.data2);
            setNormalUser(response.data.data3);
            setOrder(response.data.data4)
            setShopEarning(response.data.data5)
            setPrimeEarning(response.data.data6)
          } else {
            toast.error(response.data.message);
          }
      })
      .catch((error) => {
      
        toast.error('something went worng...');
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div class="flex flex-wrap justify-center">
      
    

      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
 
            <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Users</h5>
                        <h3 class="font-bold text-3xl">{user}<span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
    
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
         
            <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Normal Users</h5>
                        <h3 class="font-bold text-3xl">{NormalUser}<span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></h3>
                    </div>
                </div>
            </div>
      
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
      
            <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Toatal Prime Users</h5>
                      <h3 class="font-bold text-3xl"> {primeUser} <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
          
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">

            <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Order</h5>
                      <h3 class="font-bold text-3xl">{order}</h3>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
         
            <div class="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-indigo-600"><i class="fas fa-tasks fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Total Prime Earnings</h5>
                        <h3 class="font-bold text-3xl">⟨₹⟩{primeEarning}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-6">
    
            <div class="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pr-4">
                        <div class="rounded-full p-5 bg-red-600"><i class="fas fa-inbox fa-2x fa-inverse"></i></div>
                    </div>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-600">Product Earnings</h5>
                      <h3 class="font-bold text-3xl">⟨₹⟩{shopEarning}<span class="text-red-500"><i class="fas fa-caret-up"></i></span></h3>
                    </div>
                </div>
            </div>
       </div>
       </div>
    </div>
  );
};

export default DashboardLayout;
