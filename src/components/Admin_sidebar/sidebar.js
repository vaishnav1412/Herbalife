import { HiMenuAlt3 } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi";
import { HiOutlineChartPie } from "react-icons/hi";
import { HiTerminal } from "react-icons/hi";
import { HiOutlineClipboard } from "react-icons/hi";
import { HiOutlineFilm } from "react-icons/hi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Banner from "../../components/BannerList/banner.js";
import Users from "../../components/Users-list/userslist";
import Listproduct from "../../components/ListProducts/Listproducts.js";
import Adminprofile from "../AdminProfile/adminprofile.js";
import Foods from "../../components/Foods/Foods.js";
import Plan from "../../pages/Plan.js";
import AddPlan from "../../pages/AddPlan.js";
import AddVideo from "../../pages/AddVideo.js";
import ListWorkouts from "../../components/ListWorkouts/ListWorkouts";
import AddBanner from "../../pages/AddBanner.js";
import AddProducts from "../../pages/AddProducts.js";
import EditProducts from "../../pages/EditProducts.js";
import EditAdminProfile from "../../pages/EditAdminProfile.js";
import AddProfile from "../../pages/AddProfile.js";
import AddFood from "../../pages/AddFood.js";
import EditFood from "../../pages/editFood.js";
import AddContent from "../../pages/AddContent.js";
import ListContent from "../../components/ContentList/ContentList.js";

import DashboardLayouts from "../../pages/DashboardLayouts.js";
import Orders from "../../pages/Orders.js";
import OrderedProducts from "../../pages/OrderedProducts.js";
import AddRoom from "../../pages/AddRoom.js";
import AdminVideoCall from "../../pages/AdminVideoCall.js";
import AdminProtected from "../../protect/adminProtected.js";
import AdminSidePrimeUsers from "../../pages/AdminSidePrimeUsers.js";
import AdminSideSingleUserPurchase from "../../pages/AdminSideSingleUserPurchase.js";
import { apiEndPoints } from "../../util/api";
const AdminSideSingleUserPurchaseContainer = ({ props }) => {
  return <AdminSideSingleUserPurchase{...props} />;
}

const AdminSidePrimeUsersContainer = ({ props }) => {
  return <AdminSidePrimeUsers{...props} />;
}


const AdminVideoCallContainer = ({ props }) => {
  return <AdminVideoCall{...props} />;
}

const AddRoomContainer = ({ props }) => {
  return <AddRoom{...props} />;
};


const OrderedProductContainer = ({ props }) => {
  return <OrderedProducts {...props} />;
};

const OrderContainer = ({ props }) => {
  return <Orders {...props} />;
};



const ListContentContainer = ({ props }) => {
  return <ListContent {...props} />;
};

const AddFoodContainer = ({ props }) => {
  return <AddFood {...props} />;
};

const AddContentContainer = ({ props }) => {
  return <AddContent {...props} />;
};
const EditFoodContainer = ({ props }) => {
  return <EditFood {...props} />;
};

const AddProfileContainer = ({ props }) => {
  return <AddProfile {...props} />;
};
const EditProfileContainer = ({ props }) => {
  return <EditAdminProfile {...props} />;
};

const AddBannerContainer = ({ props }) => {
  return <AddBanner {...props} />;
};
const EditProductsContainer = ({ props }) => {
  return <EditProducts {...props} />;
};

const AddProductContainer = ({ props }) => {
  return <AddProducts {...props} />;
};

const AddPlanContainer = ({ props }) => {
  return <AddPlan {...props} />;
};

const WorkoutContainer = ({ props }) => {
  return <ListWorkouts {...props} />;
};

const AddVideoContainer = ({ props }) => {
  return <AddVideo {...props} />;
};

const PlanContainer = ({ props }) => {
  return <Plan {...props} />;
};

const BannersContainer = ({ props }) => {
  return <Banner {...props} />;
};

const FoodsContainer = ({ props }) => {
  return <Foods {...props} />;
};

const AdminProfileContainer = ({ props }) => {
  return <Adminprofile {...props} />;
};

const ProductsContainer = ({ props }) => {
  return <Listproduct {...props} />;
};

const UsersContainer = ({ props }) => {
  return <Users {...props} />;
};
const Sidebar = () => {
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: HiOutlineChartPie },
    { name: "Profile", link: "/dashboard/profile", icon: HiUserCircle },
   
    { name: "User", link: "/dashboard/user", icon: HiUserGroup },
    { name: "Primium Users", link: "/dashboard/primeusers", icon: HiUserGroup },
    { name: "Products", link: "/dashboard/products", icon: HiShoppingBag },
    { name: "Orders", link: "/dashboard/ordes", icon: HiShoppingCart },

    { name: "Foods", link: "/dashboard/foods", icon: HiOutlineShoppingBag },
    { name: "Plans", link: "/dashboard/plan", icon: HiOutlineCurrencyRupee },

    { name: "Banners", link: "/dashboard/banners", icon: HiTerminal },
    { name: "Content", link: "/dashboard/content", icon: HiOutlineClipboard },

    { name: "Workouts", link: "/dashboard/workouts", icon: HiOutlineFilm },
   
  ];

  const [open, setOpen] = useState(true);

  const handleMenuItemClick = async (link) => {
    try {
      if (link) {
        navigate(link);
      } else {
        toast("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex gap-6 mt-2">
      <div
        className={`bg-gray-200 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className="flex items-center  text-sm gap-3.5 text-white font-medium p-2 hover:bg-gray-400 bg-slate-900 rounded-md"
              onClick={() => handleMenuItemClick(menu.link)}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <Routes>
        
          <Route path="/user" element={ <AdminProtected><UsersContainer /> </AdminProtected>} />
          <Route path="/banners" element={ <AdminProtected><BannersContainer /> </AdminProtected>} />
          <Route path="/products" element={ <AdminProtected><ProductsContainer /> </AdminProtected>} />
          <Route path="/profile" element={ <AdminProtected><AdminProfileContainer /> </AdminProtected>} />
          <Route path="/foods" element={ <AdminProtected><FoodsContainer /> </AdminProtected>} />
          <Route path="/plan" element={ <AdminProtected><PlanContainer /> </AdminProtected>} />
          <Route path="/addplan" element={ <AdminProtected><AddPlanContainer /> </AdminProtected>} />
          <Route path="/addvideo" element={ <AdminProtected><AddVideoContainer /> </AdminProtected>} />
          <Route path="/workouts" element={ <AdminProtected><WorkoutContainer /> </AdminProtected>} />
          <Route path="/addbanner" element={<AddBannerContainer />} />

          <Route path="/addproducts" element={ <AdminProtected><AddProductContainer /> </AdminProtected>} />
          <Route path="/editproducts" element={ <AdminProtected><EditProductsContainer /> </AdminProtected>} />
          <Route path="/addprofile" element={ <AdminProtected><AddProfileContainer /> </AdminProtected>} />
          <Route path="/editadminprofile" element={ <AdminProtected><EditProfileContainer /> </AdminProtected>} />
          <Route path="/addfood" element={ <AdminProtected><AddFoodContainer /> </AdminProtected>} />
          <Route path="/editfood" element={ <AdminProtected><EditFoodContainer /> </AdminProtected>} />
          <Route path="/addcontent" element={ <AdminProtected><AddContentContainer /> </AdminProtected>} />
          <Route path="/content" element={ <AdminProtected><ListContentContainer /> </AdminProtected>} />
         
          <Route path="/" element={ <AdminProtected><DashboardLayouts /> </AdminProtected>} />
          <Route path="/ordes" element={ <AdminProtected><OrderContainer/> </AdminProtected>}/>
          <Route path="/orderdproduct/:id" element={ <AdminProtected><OrderedProductContainer/> </AdminProtected>}/>
          <Route path="/createroom" element={ <AdminProtected><AddRoomContainer/> </AdminProtected>}/>
          <Route path="/adminvideocall/:roomId" element={ <AdminProtected><AdminVideoCallContainer/></AdminProtected>} />
          <Route path="/primeusers" element={<AdminProtected><AdminSidePrimeUsersContainer/></AdminProtected>} />
          <Route path="/separateview" element={<AdminProtected><AdminSideSingleUserPurchaseContainer/></AdminProtected>} />
        </Routes>
      </div>
    </section>
  );
};

export default Sidebar;
