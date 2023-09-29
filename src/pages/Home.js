import React from "react";

import Headder from "../components/Headder/headder";
import Banner from "../components/Banner/banner";
import Footer from "../components/Footer.js/footer";
import Content from "../components/Content/content";

const Home = () => {
  return (
    <div>
      <Headder />
      <Banner />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
