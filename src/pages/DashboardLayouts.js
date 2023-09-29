import React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import Graph from "../components/Graphs/Graph";
import Graph1 from "../components/Graphs/Graph1";
import Graph2 from "../components/Graphs/Graph2";
const DashboardLayouts = () => {
  return (
    <div>
      <DashboardLayout />
      <Graph/>
      <Graph1/>
      <Graph2/>
    </div>
  );
};

export default DashboardLayouts;
