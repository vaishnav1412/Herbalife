import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";

const Shops = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState("");
  const [search, setSerch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const filteredProduct = products.filter((product) => {
    const LowerCaseSearchInput = search.toLocaleLowerCase();
    return product.name.toLocaleLowerCase().includes(LowerCaseSearchInput);
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handlePriceRange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const navigate = useNavigate();
  const id = user._id;

  const goToCart = () => {
    navigate("/user/cart");
  };
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/userfetchproducts");
      dispatch(hideLoading());
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(
        "/api/user/profiledetails",
        {},
        {
          headers: {
            Authorisation: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const  getSortedProduct = async()=>{
    try {

      const formData = {
        selectedPrice
      }

      if(formData){
        const response  = await axios.post('/api/user/pricesort',formData)
        if(response.data.success){
          setProducts(response.data.data);
        }else{
          toast.error('something went wrong.')
        }
      }else{
        toast.error('something went wrong...')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getfilterProduct = async () => {
    try {
      const formData = {
        selectedCategory,
      };

      const response = await axios.post(
        "/api/user/usercatogoryfetchproducts",
        formData
      );

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfilterProduct();
  }, [selectedCategory]);

  useEffect(()=>{
    getSortedProduct()
  },[selectedPrice])

  const addToCart = async (productId) => {
    try {
      if (productId && id) {
        const formData = {
          productId,
          id,
        };

        if (formData) {
          const response = await axios.post("/api/user/addtocart", formData);

          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error("something went wrong..");
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detailview = (productId) => {
    navigate("/user/detailview", { state: { productId } });
  };

  return (
    <div>
      <div>
        <header className="p-2 dark:bg-gray-500 dark:text-gray-100">
          <div className="container flex justify-between h-10 mx-auto">
            <div class="relative inline-block text-left">
              <select
                onChange={handleCategoryChange}
                name="category"
                class="appearance-none bg-gray-600 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-2 px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:bg-slate-900 focus:border-gray-500 dark:focus:border-gray-400"
              >
                <option value="all">All</option>
                <option value="gain">Gain</option>
                <option value="lose">Lose</option>
              </select>
              <select
                onChange={handlePriceRange}
                name="price_range"
                class="appearance-none ml-2 bg-gray-600 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-2 px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:bg-slate-900 focus:border-gray-500 dark:focus:border-gray-400"
              >
                <option value="">Sort</option>
                <option value="1">0-500</option>
                <option value="2">500-1000</option>
                <option value="3">1000-2000</option>
                <option value="4">2000-3000</option>
                <option value="5">3000-4000</option>
                <option value="6">4000-5000</option>
                <option value="7">5000-10000</option>


              </select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-600">
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.293 11.293a1 1 0 011.414 0L12 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center md:space-x-4">
              <HiShoppingCart
                className="h-10 w-10 bg-slate-600"
                onClick={() => {
                  goToCart();
                }}
              />
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    title="Search"
                    className="p-1 focus:outline-none focus:ring"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 dark:text-gray-100"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  value={search}
                  onChange={(e) => setSerch(e.target.value)}
                  placeholder="Search..."
                  className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
                />
              </div>
            </div>
            <button title="Open menu" type="button" className="p-4 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </header>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-slate-200">
        {filteredProduct.map((product, index) => (
          <div
            key={index}
            className="max-w-md mx-auto bg-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 p-2"
          >
            <img
              onClick={() => {
                detailview(product._id);
              }}
              className="w-full h-48 object-cover rounded-md"
              src={`http://localhost:5000/upload/${product.image}`}
              alt={product.name}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-semibold">
                  ₹{product.price}
                </span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={() => {
                    addToCart(product?._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shops;
