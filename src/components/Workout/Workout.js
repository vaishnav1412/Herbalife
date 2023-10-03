import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import instance from '../../Axios/axiosConfig';

const Workout = () => {
  const dispatch = useDispatch()
const [menu,setMenu] = useState([])
const [video,setVideo] = useState('https://www.youtube.com/embed/ly36kn0ug4k')

  const getData =async () =>{
    dispatch(showLoading())
    instance.post("/api/user/videolist")
    .then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        setMenu(response.data.data)
      } else {
        toast('something went worng')
      }
    })
    .catch((error) => {
      dispatch(hideLoading())
      toast.error('something went worng...');
    });
  }
  
  useEffect(()=>{
    getData()
  },[])

  return (

    <div className="flex gap-3  overscroll-y-none mt-12">
  <div className="bg-slate-600 py-6 px-3">
  <div className=" flex flex-col gap-4 relative w-64 overflow-y-scroll max-h-96 scrollbar-thin scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-600">
  {menu?.map((menu, i) => (
    
   <button  className="w-full h-10 bg-black text-white  shadow-lg hover:bg-slate-700 " onClick={()=>{setVideo(menu.link)}} >{menu?.name}</button>
    

  ))}
</div>
  </div>
    
    <div className="flex-1 flex justify-center mt-5" style={{ overflowY: 'auto' }}>
      <iframe
        width="716"
        height="403"
        src={video}
        title="HTML &amp; CSS - How to Embed a YouTube Video in Your Website"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </div>
  );
};

export default Workout;

