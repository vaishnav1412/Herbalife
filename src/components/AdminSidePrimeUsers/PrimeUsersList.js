import React, { useEffect, useState } from 'react'
import admininstance from '../../Axios/adminAxiosConfig';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const PrimeUsersList = () => {

    const [ details,setDetails] = useState([])
    const navigate = useNavigate()
    const fetchData = async()=>{
        try {
            admininstance
            .post("/api/admin/primeusersdetails")
            .then((response) => {
              if (response.data.success) {
                setDetails(response.data.data);
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
              toast.error("something went worng...");
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    const goToDetails = (id) => {
      navigate('/dashboard/separateview', { state: { id } });
    };

    useEffect(()=>{
     fetchData()
    },[])
  return (
    <div>
      <div className="w-full">
        <div className="p-5  bg-gray-200">
          <h1 className="text-2xl mb-2">Premium Users</h1>
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
                 Email
                </th>

                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  OrderId
                </th>
                
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  History
                </th>
              </tr>
            </thead>
            <tbody>
            
            {details.map((item, index) => {
                 return<tr key={index}>
                    <td className="p-3 text-sm text-blue-600">{index+1}</td>
                    <td className="p-3 text-sm text-gray-700">
                    {item.userId.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                    {item.userId.email}
                    </td>

                    <td className="p-3 text-sm text-gray-700">
                 {item._id}
                    </td>
                    
                    <td className="p-3 text-sm text-gray-700">
                      <button onClick={()=>{goToDetails(item._id)}}
                        
                        className="rounded-full bg-yellow-400 px-3 text-center text-white hover:bg-slate-300"
                      >
                        view
                      </button>
                    </td>
                   
                  </tr>
            })}
      
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PrimeUsersList
