import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/bannerlist');
      dispatch(hideLoading())
      if (response.data.data) {
        setBanner(response.data.data);
      } else {
        toast('Something went wrong');
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error('Error fetching banner data:', error);
      toast.error('An error occurred while fetching banner data.');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banner.length) % banner.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 2000);
    return () => clearInterval(interval);
  }, [banner]);

  useEffect(() => {
    // This effect will handle the text opacity transition
    const textOpacityTimeout = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % banner.length;
      setCurrentIndex(nextIndex);
    }, 2000); // Adjust the duration as needed for your transition

    return () => clearTimeout(textOpacityTimeout);
  }, [currentIndex, banner]);

  return (
    <div className='p-3'>
      <div className='relative overflow-hidden md:h-[87vh]'>
        {banner.map((image, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === currentIndex ? 'block' : 'hidden'
            }`}
            data-carousel-item
          >
            <img
              src={`http://localhost:5000/upload/${image.image}`}
              className='absolute block w-full h-full top-0 left-0 transform scale-100 transition-transform duration-700 ease-in-out'
              alt={`Car ${index + 1}`}
            />
          <div className='absolute inset-0 flex items-center mt-16'>
  <div className='absolute inset-0 flex flex-col items-start justify-center '>
    <div className='mb-5' >
      <span className='text-indigo-800 text-2xl md:text-4xl font-bold'>
        Our bodies are our gardens...
      </span>
    </div>
    <div >
      <span className='text-green-500 text-2xl md:text-5xl font-bold'>
        our wills are our gardeners.......
      </span>
    </div>
  </div>
</div>
          </div>
        ))}
      </div>

      <button
        type='button'
        className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        data-carousel-prev
        onClick={handlePrevClick}
      >
        {/* Use your SVG image here for Previous */}
      </button>
      <button
        type='button'
        className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
        data-carousel-next
        onClick={handleNextClick}
      >
        {/* Use your SVG image here for Next */}
      </button>
    </div>
  );
};

export default Banner;
