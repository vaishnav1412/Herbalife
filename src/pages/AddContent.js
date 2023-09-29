import React, { useState } from "react";
import "../components/AddBanner/addbanner.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddContent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [imageError, setImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVerified = true;

    if (title.trim() === "") {
      setTitleError("Please enter a title");
      isVerified = false;
    }
    if (description.trim() === "") {
      setDescriptionError("Please enter a title");
      isVerified = false;
    }

    if (image === null) {
      setImageError("Please upload an image");
      isVerified = false;
    }

    if (isVerified) {
      const formData = {
        title,
        description,
        image,
      };

      try {
        const response = await axios.post("/api/admin/addcontent", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          toast.success(response.data.message);
          toast("Redirected to content page");
          navigate("/dashboard/content");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
        <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
          <h2 className="login_center text-3xl font-bold">Add Content</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="banner_input"
                placeholder="Enter Content Title"
                type="text"
                onChange={handleTitle}
              />
              <p className="bannererror">{titleError}</p>
              <input
                className="banner_input"
                placeholder="Enter content description"
                type="text"
                onChange={handleDescription}
              />
              <p className="bannererror">{descriptionError}</p>
              <input
                className="banner_input"
                placeholder="Upload Banner Image"
                type="file"
                accept="image/*"
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
};

export default AddContent;
