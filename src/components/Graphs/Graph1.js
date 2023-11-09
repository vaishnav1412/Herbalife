import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import admininstance from "../../Axios/adminAxiosConfig";
import { apiEndPoints } from "../../util/api";
function Graph1() {
  const [chartData, setChartData] = useState({
    series: [0, 0], 
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Normal Users', 'Prime Users'],
    },
  });

  useEffect(() => {
    
    async function fetchData() {
      try {
        const response = await admininstance.post(apiEndPoints.userlist); 
        const data = await response.data.data
        const normalUsersCount = data.filter((user) => user.isPrime === 0).length;
        const primeUsersCount = data.filter((user) => user.isPrime === 1).length;

        setChartData({
          series: [normalUsersCount, primeUsersCount],
          options: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Normal Users', 'Prime Users'],
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); 

  return (
   <div className=' w-full  flex align-middle justify-center'>
     <div id="chart" >
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={380}
      />
    </div>
   </div>
  );
}

export default Graph1;
