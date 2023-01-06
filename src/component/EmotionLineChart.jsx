import { useEffect, useState} from "react"
import { dataArray  } from "./FaceApi"
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
const EmotionLineChart = ({currentTime}) => {
  const labels = [];
  for(let i = 0; i< 4; i++){
    labels.push(Math.floor(currentTime+i))
  }

  const dataArray2 = dataArray.map((data) => (data[0].detection._score*100));
  console.log(dataArray2);
   const data = {
    labels,
    datasets: [
      {
        label: 'Neutral',
        data: dataArray.map((data) => ((data[0].expressions.neutral)*100)),
        borderColor: 'rgb(142,145,143)',
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'rgba(142,145,143, 0.5)',
      },
      {
        label: 'Negative',
        data: dataArray.map((data) => ((data[0].expressions.disgusted+ data[0].expressions.angry + data[0].expressions.fearful +  data[0].expressions.sad)*100)),
        borderColor: 'rgb(249,93,106)',
        backgroundColor: 'rgba(249,93,106, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Positive',
        data: dataArray.map((data) => ((data[0].expressions.happy+ data[0].expressions.surprised)*100)),
        borderColor: 'rgb(47, 75, 124)',
        backgroundColor: 'rgba(47, 75, 124, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

    return (
        <div className="w-[40%]">
        <Line options={options} data={data}></Line>
        </div>
    )


}
export default EmotionLineChart;