import React, { useEffect, useState } from 'react'
import instance from '../../Axios/axiosConfig';
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";
const UserOrder = () => {
 
 const [order,setorder ] = useState([])
 const fetchUserDetails = async() => {
  try {
    instance.post(
     apiEndPoints.userSideOrder,
     
    )
    .then((response) => {
     
      setorder(response.data.data);
    })
    .catch((error) => {
     
      toast.error('something went worng...');
    });
  } catch (error) {
    console.error("Error fetching user details", error);
  }
};

useEffect(()=>{
  fetchUserDetails()
},[])


  return (
   <div className='p-4'>
<div className="col-span-1 bg-gray-500 lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-white px-8">
            Order Summary
          </h1>

{order.map((items,index)=>{
       return<div  key={items._id}>


<ul className="py-6 border-b space-y-6 px-8">
{items.products.map((product, productIndex) => { 
           return<li className="grid grid-cols-6 gap-2 border-b-1">
             <div className="col-span-1 self-center">
               <img
                 src={`https://herbalproject.online/upload/${product?.image}`}
                 alt="Product"
                 className="rounded w-14 h-14"
               />
             </div>
             <div className="flex flex-col col-span-3 pt-2">
              
               <span className=" text-white text-sm inline-block pt-2">
           {product.name}
               </span>
             </div>
             <div className="col-span-2 pt-3">
               <div className="flex items-center space-x-2 text-sm justify-between">
                 <span className=" text-white">
                   {product.count}x₹{product.productPrice}
                 </span>
                 <span className="text-yellow-200 font-semibold inline-block">
                   {" "}
                   ₹{product.count*product.productPrice}
                 </span>
               </div>
             </div>
           </li>
           })}
       
     </ul>
     <div className="px-8 border-b">
       <div className="flex justify-between py-4 text-white">
         <span>Subtotal</span>
         <span className="font-semibold text-yellow-300"> ₹{items.totalAmount}</span>
       </div>
       <div className="flex justify-between py-4  text-white">
         <span>Shipping</span>
         <span className="font-semibold text-yellow-300">Free</span>
       </div>
     </div>
     <div className="font-semibold text-xl px-8 flex justify-between py-4  text-white ">
       <span>Total</span>
       <span> ₹{items.totalAmount}</span>
       <div>
       <div
  className={`px-4 mb-2 flex align-middle justify-center w-36 rounded-md ${
    items.status === 'Pending' ? 'bg-yellow-300' : 'bg-green-300'
  }`}
>
  <h1 className='text-slate-900'>{items.status}</h1>
</div>
       </div>
      
     </div>
     <div className='w-full h-2 bg-white'></div>



       </div>

        })}

        
          </div>
   </div>
   
  )
}

export default UserOrder
