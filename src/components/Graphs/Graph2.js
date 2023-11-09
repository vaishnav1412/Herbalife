import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import admininstance from "../../Axios/adminAxiosConfig";
import { apiEndPoints } from "../../util/api";
function Graph2() {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0], 
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: 'Orders Status',
      },
      labels: ['Placed', 'Pending', 'Delivered'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
   
    async function fetchData() {
      try {
        const response = await admininstance.post(apiEndPoints.displayOrder); 
        const data = await response.data.data

        const placedOrdersCount = data.filter((order) => order.status === 'Placed').length;
        const pendingOrdersCount = data.filter((order) => order.status === 'Pending').length;
        const deliveredOrdersCount = data.filter((order) => order.status === 'Delivered').length;

        setChartData({
          series: [placedOrdersCount, pendingOrdersCount, deliveredOrdersCount],
          options: chartData.options, 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [chartData.options]); 

  return (
    <div className=' w-full  flex align-middle justify-center'>
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width={380}
      />
    </div>
    </div>
  );
}

export default Graph2;
