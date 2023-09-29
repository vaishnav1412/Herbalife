import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const Content = () => {
    const [content,setcontent] = useState([])

    const getData = async() =>{
        try {
            const response = await axios.post('/api/user/contentlist');
      
            if (response.data.data) {
              setcontent(response.data.data);
            } else {
              toast('Something went wrong');
            }
          } catch (error) {
            console.error('Error fetching banner data:', error);
            toast.error('An error occurred while fetching banner data.');
          }
    }


useEffect(()=>{

  getData()

},[])
  return (
    <div>

{content.map((items,index)=>{
return<>

{index%2===0||index===0 ? (



 <a href="#" class="flex flex-col md:flex-row items-center bg-white border border-gray-200 shadow hover:bg-gray-200 dark:border-gray-700 dark:bg-white dark:hover:bg-gray-200 h-screen">


<div class="md:w-1/2 h-full p-12">
    <img class="object-cover w-full h-full" src={items.image} alt=""/>
</div>


<div class="md:w-1/2 flex flex-col justify-center p-4 leading-normal">
    <h5 class="mb-2 text-2xl font-bold tracking-tight font-bold text-4xl dark:text-black">{items?.title}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-700">{items?.description}</p>
</div>

</a>

):(


    
  

<a href="#" class="flex flex-col md:flex-row items-center bg-gray-700 border border-gray-200 shadow hover:bg-gray-500 dark:border-gray-800 h-screen">



<div class="md:w-1/2 flex flex-col justify-center p-4 leading-normal">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{items?.title}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{items?.description}</p>
</div>

<div class="md:w-1/2 h-full p-12">
    <img class="object-cover w-full h-full" src={items?.image} alt=""/>
</div>


</a>
  )}
</>
})}
    </div>
  )
}

export default Content
