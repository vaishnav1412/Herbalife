import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import toast from "react-hot-toast";
import admininstance from "../../Axios/adminAxiosConfig";
import { apiEndPoints } from "../../util/api";
const Graph = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '10%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [],
        tickPlacement: 'on',
      },
      yaxis: {
        title: {
          text: 'Sales Amount',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  });

  useEffect(() => {
    
    admininstance.post(apiEndPoints.dashBoardDisplayOrders).then((response) => {
      const orders = response.data.data;
      const monthlySales = {};
      orders.forEach((order) => {
        const monthYear = new Date(order.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        });
        if (!monthlySales[monthYear]) {
          monthlySales[monthYear] = order.totalAmount;
        } else {
          monthlySales[monthYear] += order.totalAmount;
        }
      });
      const categories = Object.keys(monthlySales);
      const series = [
        {
          name: 'Sales Amount',
          data: Object.values(monthlySales),
        },
      ];

      setChartData({
        ...chartData,
        series,
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories,
          },
        },
      });
    }).catch((error) => {
      toast.error("something went worng...");
    });
  }, []);

  return (
  <div className='w-full '>
      <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  </div>
  );
};

export default Graph;