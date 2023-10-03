import React, { useState } from 'react'

import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import admininstance from "../../Axios/adminAxiosConfig";

const Addproducts = () => {

  const[name,setName]  = useState('')
  const[price,setPrice] = useState('')
  const[quantity,setQuantity] =useState('')
  const[stock,setStock] = useState('')
  const[description,setDescription] = useState('')
  const [image, setImage] = useState(null); 
  const [catogory,setCatogory] = useState('')

  const[nameError,setNameError] = useState('')
  const[priceError,setPriceerror] =useState('')
  const[quantityError,setQuantityError] = useState('')
  const[stockError,setStockError] = useState('')
  const[descriptionError,setDescriptionError] = useState('')
  const[imageError,setImageError] = useState('')
  const[error7,setError7] = useState('')
  const navigate =useNavigate()

  const handleName = (event)=>{
    setName(event.target.value)

  }
  const handlePrice =(event)=>{
    setPrice(event.target.value)
    
  }
  const handledescription =(event)=>{
    setDescription(event.target.value)
  }
  const handleQuantity =(event)=>{
    setQuantity(event.target.value)
  }
  const handlestock = (event) =>{
    setStock(event.target.value)
  }
  const handleImage = (event) =>{
    setImage(event.target.files[0])
  }
  const handleCatogory = (event) =>{
    setCatogory(event.target.value)
  }
   
  const handleSubmit = async (event)=>{ 

    event.preventDefault();
    let isVarified = true;

    if (name.trim() === "") {
      setNameError("Please enter product name");
      isVarified = false;
    }
    if (price==='') {
      setPriceerror("Please enter price ");
      isVarified = false;
    }
    if (quantity==='') {
      setQuantityError("Please enter quantity.");
      isVarified = false;
    }

    if (stock==='') {
      setStockError("Password must be at least 8 characters long.");
      isVarified = false;
    }

    if (image===null) {
      setImageError("your Image field is empty");
      isVarified = false;
    }
    if(description.length===""){
      setDescriptionError('please enter description')
      isVarified=false
    }
    if(catogory.length===""){
      setError7('please select a catogory')
      isVarified=false
    }

    if (isVarified) {
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price); 
      formData.append("quantity", quantity);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("catogory", catogory);

      try {
        admininstance
        .post('/api/admin/addproducts',formData, {
          headers:{
            'Content-Type': 'multipart/form-data',
          }
      })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/dashboard/products");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  }

  console.log(description);

  return (
    <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
    <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
      <h2 className="register-heading text-3xl font-bold text-center mb-8">Add products</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            className="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Products Name"
            name="productname"
            onChange={handleName}
          />
          <p className="text-red-500">{nameError}</p>
        </div>

        <div class="relative">
            <select
              class="input-register border rounded-lg p-2 w-full"
              name="duration"
              onChange={handleCatogory}
            >
              <option value="" disabled selected>
                Select a catogory
              </option>
              <option value="1">weight gain food</option>
              <option value="3">weight lose food</option>
            </select>
            <p class="text-red-500">{error7}</p>
          </div>

        <div className="relative">
        <input
            className="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Products Price"
            name="productprice"
            type='number'
            onChange={handlePrice}
          />
          <p className="text-red-500">{priceError}</p>
        </div>
        <div class="relative">
          <textarea
            className="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Product Description"
            type=''
            name="description"
            onChange={handledescription}
          />
          <p className="text-red-500">{descriptionError}</p>
        </div>
        <div className="relative">
          <input
            className="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Product quantity"
            type='text'
            name="quantity"
            onChange={handleQuantity}
          />
          <p className="text-red-500">{quantityError}</p>
        </div>
        <div className="relative">
          <input
            className="input-register border rounded-lg p-2 w-full"
            placeholder="Enter Products Stok"
            name="stock"
            type="number"
            onChange={handlestock}
          />
          <p className="text-red-500">{stockError}</p>
        </div>
        <div className="relative">
        <input
  className="input-register border rounded-lg p-2 w-full"
  placeholder="upload image"
  name="image" 
  type="file"
  onChange={handleImage}
/>
          <p className="text-red-500">{imageError}</p>
        </div>
        <div className="relative">
          <button className="btn1 w-full py-2 bg-black text-white rounded-lg">
            Submit
          </button>
        </div>
      </form>
     
    </div>
  </div>
  )
}

export default Addproducts
