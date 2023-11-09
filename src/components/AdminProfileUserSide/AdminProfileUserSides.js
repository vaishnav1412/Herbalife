import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import instance from '../../Axios/axiosConfig';
import { apiEndPoints } from "../../util/api";

const AdminProfileUserSides = () => {
    const navigate = useNavigate()
    const [admin,setAdmin] = useState('')
    const dispatch = useDispatch()
   

const getData= async () =>{ 
  dispatch(showLoading())
    const response = await instance.post(apiEndPoints.getAdminData)
    dispatch(hideLoading())
    if(response.data.success){
        setAdmin(response.data.data)
        
    }else{
        toast.error(response.data.message)
    }
 
}
    useEffect(()=>{
        getData()
        
    },[])

    const goToConnect =()=>{
    
      navigate('/user/connect')
  }
  return (
    <div class="h-screen bg-gray-200 pt-20">
    <div>
        <div class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-2xl">
            <div class="border-b px-4 pb-6">
                <div class="text-center my-4">
                    <img class="h-32 w-32 rounded-full border-4 border-white mx-auto my-4" src={`https://herbalproject.online/upload/${admin[0]?.image}`} alt=""/>
                    <div class="py-2">
                        <h3 class="font-bold text-2xl mb-1">{admin[0]?.name}</h3>
                        <div class="inline-flex text-gray-700 items-center">
                            
                            {admin[0]?.qulification},({admin[0]?.experience} Years)
                        </div>
                    </div>
                </div>
                <div class="flex gap-2 px-2">
                   
                    <button onClick={()=>{goToConnect()}} class="flex-1 rounded-full bg-green-400 border-2 border-gray-400 font-semibold text-black px-4 py-2">Connect</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AdminProfileUserSides
