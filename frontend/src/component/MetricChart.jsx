import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const MetricChart = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return <div>Нет данных метрик</div>;

  const data = {
    labels: metrics.map(m => m.datetime),
    datasets: [
      {
        label: 'CPU',
        data: metrics.map(m => m.cpu_utilization),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Memory',
        data: metrics.map(m => m.memory_utilization),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Disk',
        data: metrics.map(m => m.disk_utilization),
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div
      style={{
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: '1px solid #ddd',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default MetricChart;
