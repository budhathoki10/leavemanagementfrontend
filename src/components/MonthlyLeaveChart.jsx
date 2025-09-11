import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyLeaveChart = () => {
  const data = {
    labels: [
      
      "Full Stack Development",
      "Concepts and technologies of AI",
      "Object Oriented Programming",
      
    ],
    datasets: [
      {
        label: "Leaves Taken",
        data: [2, 8, 2, 3, 2, 2, 3, 1, 2, 1, 2, 2], // Example data
        backgroundColor: "rgba(16, 185, 129, 0.7)", // teal
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows custom height
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          // font: {size: 14, weight: "bold"}
        },
      },
      title: {
        display: true,
        text: "Leaves Per Module",
        color: "#111827",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#6b7280" },
        grid: { color: "#e5e7eb" },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <ChartBg>
        {" "}
        <div
          className="flex-1 bg-white p-60 rounded-2xl shadow"
          style={{ height: "340px", width: "920px" }}
        >
          <Bar data={data} options={options} />
        </div>
      </ChartBg>
    </>
  );
};

export default MonthlyLeaveChart;

const ChartBg = styled.div`
  margin: 30px 0px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;
