import React, { useEffect, useState } from "react";
import admininstance from "../../Axios/adminAxiosConfig";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Editproducts = () => {
  const location = useLocation();
  const id = location.state?.id;
  console.log(id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [catogory, setCatogory] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const formData = {
      id,
    };

    try {
      if (id) {
        admininstance
          .post("/api/admin/fetchproduct", formData)
          .then((response) => {
            if (response.data.success) {
              setProduct(response.data.data);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error("something went worng...");
          });
      } else {
        toast("somthing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handledescription = (event) => {
    setDescription(event.target.value);
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handlestock = (event) => {
    setStock(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };
  const handleCatogory = (event) => {
    setCatogory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProductId(product._id);
    let isVarified = true;

    if (isVarified) {
      if (image === null) {
        const formData = {
          name,
          price,
          quantity,
          stock,
          description,
          productId,
          catogory,
        };
        try {
          admininstance
            .post("/api/admin/editproducts", formData)
            .then((response) => {
              if (response.data.success) {
                toast.success(response.data.message);
                navigate("/dashboard/products");
              } else {
                toast.error(response.data.message);
                navigate("/dashboard/products");
              }
            })
            .catch((error) => {
              toast.error("something went worng...",error);
            });
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      } else {
        const formData = {
          name,
          image,
          price,
          quantity,
          stock,
          description,
          productId,
          catogory,
        };
        try {
          admininstance
            .post("/api/admin/editproductswithimage", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.success) {
                toast.success(response.data.message);
                navigate("/dashboard/products");
              } else {
                toast.error(response.data.message);
                navigate("/dashboard/products");
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
  };

  return (
    <div class="bg-slate-200 min-h-screen flex justify-center items-center p-4">
      <div class="register-form bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 className="register-heading text-3xl font-bold text-center mb-8">
          Edit products
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              className="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Products Name"
              name="productname"
              onChange={handleName}
              defaultValue={product.name}
            />
          </div>
          <div className="relative">
            <input
              className="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Products Price"
              name="productprice"
              onChange={handlePrice}
              type="number"
              defaultValue={product.price}
            />

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
              <p class="text-red-500"></p>
            </div>
          </div>
          <div class="relative">
            <textarea
              className="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Product Description"
              type="text"
              name="description"
              onChange={handledescription}
              defaultValue={product.description}
            />
          </div>
          <div className="relative">
            <input
              className="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Product quantity"
              type="text"
              name="quantity"
              onChange={handleQuantity}
              defaultValue={product.quantity}
            />
          </div>
          <div className="relative">
            <input
              className="input-register border rounded-lg p-2 w-full"
              placeholder="Enter Products Stok"
              name="stock"
              type="number"
              defaultValue={product.stock}
              onChange={handlestock}
            />
          </div>
          <div className="relative">
            <div className="p-2">
              <img
                src={`http://localhost:5000/upload/${product.image}`}
                className="max-w-full h-10 w-10"
              />
            </div>
            <input
              className="input-register border rounded-lg p-2 w-full"
              placeholder="upload image"
              name="image"
              type="file"
              onChange={handleImage}
            />
          </div>

          <div className="relative">
            <button className="btn1 w-full py-2 bg-black text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editproducts;
