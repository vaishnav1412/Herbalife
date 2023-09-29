import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import admininstance from "../../Axios/adminAxiosConfig";
const Foods = () => { 
    const [food,setFood] = 
    useState([])

    const navigate = useNavigate()

    const addFood = () => {
        navigate ('/dashboard/addfood')
    }

    const editFood =async(id) =>{
        navigate('/dashboard/editFood',{state:{id}})

    }

    const deleteFood =async (id) =>{
    

        try {
           const formData ={
            id
           }


           Swal.fire({
            title: "Are you sure?",
            text: "you want to delete the food?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            footer: '<a href="#">Learn more about delete foods</a>',
            customClass: "swal-delete-food",
          }).then(async (result) => {
            if (result.isConfirmed) {
              admininstance.post("/api/admin/deletefood",formData)
              .then((response) => {
                if(response.data.success){
                  navigate('/dashboard/foods')
                  getFoods()
                  toast.success(response.data.message);
              }
              else{
                  toast.error(response.data.message);
              }
              })
              .catch((error) => {
                toast.error('something went worng...');
              });
          }})
        } catch (error) {
            console.log(error);
        }
    }
    const  getFoods =async () =>{
      admininstance.post("/api/admin/fetchfood")
      .then((response) => {
        if(response.data.success){
          setFood(response.data.data)
      }
      else{
          toast('something went wrong')
      }
      })
      .catch((error) => {
        toast.error('something went worng...');
      });
        }


    useEffect(()=>{
        getFoods()
    },[])

     console.log(food);
  return (
    <div className="w-full">
      
    
    <div className="p-5 h-screen bg-gray-200">
      <h1 className="text-2xl mb-2">Foods List</h1>
      <button className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300 m-3" onClick={()=>{addFood()}} >Add Food</button>
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-700">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">NO</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Day</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Type</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Time</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Foods</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Catogory</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Action 1</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Action 2</th>
          </tr>
        </thead >
        <tbody >
        {food.map((item,index)=>{
           return<tr className="bg-gray-300 border-b-2 border-gray-700 ">
            <td className="p-3 text-sm  text-blue-600">{index+1}</td>
            <td className="p-3 text-sm text-gray-700">{item.day}</td>
            <td className="p-3 text-sm text-gray-700">{item.type}</td>
            <td className="p-3 text-sm text-gray-700">{item.time}</td>
            <td className="p-3 text-sm text-gray-700">{item.foods}</td>
            <td className="p-3 text-sm text-gray-700">{item.catogory}</td>
            <td className="p-3 text-sm text-gray-700"><button className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300" onClick={()=>{editFood(item._id)}} >Edit Food</button></td>
            <td className="p-3 text-sm text-gray-700"><button className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300" onClick={()=>{deleteFood(item._id)}}>Delete Food</button></td>
          </tr>
          })} 
        </tbody>
      </table>
    </div>
  
</div>
  )
}

export default Foods
