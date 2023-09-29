import React, { useEffect, useState } from 'react'
import admininstance from '../../Axios/adminAxiosConfig';
import toast from "react-hot-toast";
const PrimeUsersList = () => {


    const [ details,setDetails] = useState('')

    const fetchData = async()=>{
        try {
            admininstance
            .post("/api/admin/primeusersdetails")
            .then((response) => {
            //   if (response.data.success) {
            //     setDetails(response.data.data);
            //   } else {
            //     toast.error(response.data.message);
            //   }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
              toast.error("something went worng....");
            });
            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
     fetchData()
    },[])
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
            
               
                  <tr >
                    <td className="p-3 text-sm text-blue-600">1</td>
                    <td className="p-3 text-sm text-gray-700">
                     vaishnavvm
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                     addresss
                    </td>

                    <td className="p-3 text-sm text-gray-700">
                     1499
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                     deliverd
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      date
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <button
                        o
                        className="rounded-full bg-yellow-400 px-3 text-center text-white hover:bg-slate-300"
                      >
                        view
                      </button>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <button
                        
                      >
                       status
                      </button>
                    </td>
                  </tr>
      
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PrimeUsersList
