import React from "react";
import Headder from "../components/Headder/headder";
import AdminProfileUserSides from "../components/AdminProfileUserSide/AdminProfileUserSides";
import Footer from "../components/Footer.js/footer";
const AdminProfileUserSide = () => {
  return (
    <div>
      <Headder />
      <AdminProfileUserSides />
      <Footer />
    </div>
  );
};

export default AdminProfileUserSide;
