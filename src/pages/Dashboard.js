import React, { useEffect } from "react";
import axios from "axios";
import Header from "../components/Admin_header/header";
import Sidebar from "../components/Admin_sidebar/sidebar";

const Dashboard = () => {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/admin/get-admin-info-by-id",
        {},
        {
          headers: {
            Authorisation: "Bearer " + localStorage.getItem("admin_token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
