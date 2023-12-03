import { Chart as ChartJS, CategoryScale, LinearScale, 
  PointElement, LineElement, Title, Tooltip, Legend } 
  from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartLineComponent({ labels, labelName, data, title }) {

    const chartData = {
        labels: labels,
        datasets: [{
          label: labelName,
          data: data,
          backgroundColor: '#9333ea',
          borderColor: '#9333ea',
          borderWidth: 1
        }]
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
        scales: {
            x: {
              display: false, // Hide x-axis labels
            },
        },
    };

    return (
        <Line options={options} data={chartData} className='my-10'/>
    );
};