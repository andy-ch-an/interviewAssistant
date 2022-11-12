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
import faker from 'faker'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
let delayed;
export const options = {
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    plugins: {
        title: {
            display: true,
            text: 'EMOTION',
        },
    },
};
const labels = ['1', '2', '3', '4', '5', '6', '7','8','9','10'];
export const data = {
    labels,
    datasets: [
      {
        label: 'Neutral',
        data: [10,20,30,20,50,20,10,11,0,12],
        borderColor: 'rgb(142,145,143)',
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'rgba(142,145,143, 0.5)',
      },
      {
        label: 'Positive',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(249,93,106)',
        backgroundColor: 'rgba(249,93,106, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Negative',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(47, 75, 124)',
        backgroundColor: 'rgba(47, 75, 124, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };
const EmotionLineChart = () => {
    const [chartData, setChartData] = useState(
        [{ time: 0, energy: 12 },
        { time: 1, energy: 15 },
        { time: 2, energy: 10 },
        { time: 3, energy: 18 }]
    )

    return (
        <div className="w-[40%]">
        <Line options={options} data={data}></Line>
        </div>
    )


}
export default EmotionLineChart;