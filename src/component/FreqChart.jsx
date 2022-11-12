import { useEffect, useState, useRef } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
let delayed;
export const options = {
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
    },
    plugins: {
        title: {
            display: true,
            text: 'EMOTION',
        },
    },
};

const labels = Array.from({length:30}, (v,i)=>i*40);



const FreqChart = ({freq, currentTime})=>{
  const data = {
    labels,
    datasets: [
      {
        label: 'Pitch',
        data: freq[Math.floor(currentTime*1000/43.478)],
        borderColor: 'rgb(142,145,143)',
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'rgba(142,145,143, 0.5)',
      },
    ],
  };
  return (
    <div className="w-[40%]">
    <Line options={options} data={data}></Line>
    </div>
  )
}
export default FreqChart;