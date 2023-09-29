import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';
const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [list,setList] = useState([])
  const [cart,setCart] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userId = cart.userId
 
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "/api/user/fetchcartdetails",
        {},
        {
          headers: {
            Authorisation: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading())
    if(response){
      setList(response.data.data.products);
      setCart(response.data.data)
      setTotalPrice(response.data.total)
      
    }else{
      toast.error(response.data.message)
    }
    } catch (error) {
      dispatch(hideLoading())
      console.error("Error fetching user details", error);
    }
  };

  useEffect(()=>{
    fetchUserDetails();
  },[])

const increment = async(id)=>{
  const formData={
    id,userId
  }
  if(formData){
    const response=await axios.post('/api/user/increment',formData)
    if(response.data.success){
      fetchUserDetails();
    }else{
     toast.error(response.data.message)
    }
  }else{
    console.log('something went wrong');
  }
}




const decrement =async (id)=>{
  const formData={
    id,userId
  }
  if(formData){
    const response=await axios.post('/api/user/decrement',formData)
           if(response.data.success){
            fetchUserDetails();
           }else{
            toast.error(response.data.message)
           }
  }else{
    console.log('something went wrong');
  }
}
const deleteItem = async(productId)=>{
  try {
    const formData = {
      productId,userId
     }
     if(productId){
  
      const response=await axios.post('/api/user/deletecartdata',formData)
  
      if(response.data.success){
        fetchUserDetails();
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
     }else{
      toast.error('something went wrong...')
     }
  } catch (error) {
    console.log(error);
  }
}

const goToCheckout = () =>{
 navigate('/user/checkout')
}



  return (
    <div class="bg-gray-500 p-3">
  
  <div class="container mx-auto mt-2">
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-slate-300 px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{list.length}</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>

{list.map((list,index)=>{
        return<div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div class="flex w-2/5"> 
            <div class="w-20">
              <img class="h-24"  src={`http://localhost:5000/upload/${list?.image}`} alt=""/>
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">{list?.name}</span>
              <span class="text-red-500 text-xs">{list?.catogory==="1"?'gain':'lose'}</span>
              <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={()=>{deleteItem(list?.productId)}}>Remove</a>
            </div>
          </div>
          <div class="flex justify-center w-1/5">
            <svg class="fill-current text-gray-600 w-3" onClick={()=>{increment(list?.productId)}} viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input class="mx-2 border text-center w-8" type="text" value={list.count}/>

            <svg class="fill-current text-gray-400 w-3" onClick={()=>{decrement(list?.productId)}}  viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm"> ₹{list.price}</span>
          <span className="text-center w-1/5 font-semibold text-sm"> ₹{list.price * list.count}</span>
        </div>
        })}
        <a href="/user/shop" class="flex font-semibold text-indigo-600 text-sm mt-10">
          <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </a>
      </div>

      <div id="summary" class="w-1/4 px-8 py-10 bg-slate-200">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Items{list.length}</span>
          <span class="font-semibold text-sm"> ₹{totalPrice}</span>
        </div>
        
        
        
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span> ₹{totalPrice}</span>
          </div>
          <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={()=>{goToCheckout()}}>Checkout</button>
        </div>
      </div>

    </div>
  </div>


    </div>
  )
}

export default Cart
