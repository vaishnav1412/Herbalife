import React from "react";
import Bmicalculator from "../components/BMI/bmi";
import Headder from "../components/Headder/headder";
import Footer from "../components/Footer.js/footer";

const Bmi = () => {
  return (
    <div>
      <Headder />
      <Bmicalculator />
      <Footer />
    </div>
  );
};

export default Bmi;
