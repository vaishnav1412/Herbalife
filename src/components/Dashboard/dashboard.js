import React from "react";

const Dashboard = () => {
  return (
    <div className="p-3">
      
      
        <div className="p-5 h-screen bg-gray-200">
          <h1 className="text-xl mb-2">Users List</h1>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">NO</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left" >Age</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone No</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Action</th>
              </tr>
            </thead >
            <tbody >
              <tr className="bg-gray-300 ">
                <td className="p-3 text-sm  text-blue-600">1</td>
                <td className="p-3 text-sm text-gray-700">Vaishnav</td>
                <td className="p-3 text-sm text-gray-700">24</td>
                <td className="p-3 text-sm text-gray-700">9605368262</td>
                <td className="p-3 text-sm text-gray-700">vaishnavvm40@gmail.com</td>
                <td className="p-3 text-sm text-gray-700">Active</td>
                <td className="p-3 text-sm text-gray-700"><button className="rounded-full bg-red-600 px-3 text-center text-white hover:bg-slate-300">Block</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      
    </div>
  );
};

export default Dashboard;
