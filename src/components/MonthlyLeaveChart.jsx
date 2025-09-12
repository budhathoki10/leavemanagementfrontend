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


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyLeaveChart = ({ monthlyData }) => {
  const labels = monthlyData.map((item) => item.module.Modulename);
  const values = monthlyData.map((item) => item.daysTaken);

  const data = {
    labels,
    datasets: [
      {
        label: "Leaves Taken",
        data: values,
        backgroundColor: "rgba(16, 185, 129, 0.7)", // teal
        borderRadius: 6,
        barThickness: 50, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#374151" },
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
        suggestedMax: 8,
      },
    },
  };

  return (
    <ChartBg>
      <ChartContainer>
        <Bar data={data} options={options} />
      </ChartContainer>
    </ChartBg>
  );
};

export default MonthlyLeaveChart;


const ChartBg = styled.div`
  margin: 30px 0px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ChartContainer = styled.div`
  width: 920px; /* fixed wide width */
  height: 350px; /* taller for better bar visibility */
  padding: 20px;
  margin: auto; /* center horizontally */
`;
