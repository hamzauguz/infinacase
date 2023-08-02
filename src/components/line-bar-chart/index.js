import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartData, chartOptions } from "../../helpers/chart-helpers";

import "./Styles.LineBarChart.css";
import { useMediaQuery } from "react-responsive";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const LineBarChart = ({ productPrices, labels }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <div className="chart-container">
      <Bar
        options={chartOptions}
        data={chartData(productPrices, labels, isMobile ? 40 : 100)}
      />
    </div>
  );
};

export default LineBarChart;
