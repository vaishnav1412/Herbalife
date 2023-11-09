import React, { useState } from 'react';
import './addbanner.css';
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";
import { useNavigate } from 'react-router-dom';
import admininstance from "../../Axios/adminAxiosConfig";


const Addbanner = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null); 
    const [titleError, setTitleError] = useState('');
    const [imageError, setImageError] = useState('');
   

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleImage = (event) => {
        setImage(event.target.files[0]); 
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isVerified = true;
        
        if (title.trim() === '') {
            setTitleError('Please enter a title');
            isVerified = false;
        }

        if (image === null) {
            setImageError('Please upload an image');
            isVerified = false;
        }

        if (isVerified) {
          
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);
            

            try {
                admininstance
                .post(apiEndPoints.addBanner,formData, {
                    headers:{
                      'Content-Type': 'multipart/form-data',
                    }
                })
                .then((response) => {
                    if (response.data.success) {
                        toast.success(response.data.message);
                        toast("Redirected to banner page");
                        navigate("/dashboard/banners");
                    } else {
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                  toast.error("something went worng...");
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
                    <h2 className="login_center text-3xl font-bold">Add Banner</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                className="banner_input"
                                placeholder="Enter Banner Title"
                                type="text"
                                onChange={handleTitle}
                            />
                            <p className="bannererror">
                                {titleError}
                            </p>
                            <input
                                className="banner_input"
                                placeholder="Upload Banner Image"
                                type="file"
                              
                                onChange={handleImage} 
                            />
                            <p className="bannererror">{imageError}</p>
                        </div>
                        <div>
                            <button className="btn10" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addbanner;
