import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

export default function ChartComponent({ chartData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [chartData]);

  return (
    <canvas ref={chartRef} />
  );
};