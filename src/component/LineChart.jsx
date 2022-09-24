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
import * as d3 from "d3"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
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
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(142,145,143)',
        backgroundColor: 'rgba(142,145,143, 0.5)',
      },
      {
        label: 'Positive',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(249,93,106)',
        backgroundColor: 'rgba(249,93,106, 0.5)',
      },
      {
        label: 'Negative',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(47, 75, 124)',
        backgroundColor: 'rgba(47, 75, 124, 0.5)',
      },
    ],
  };
const LineChart = () => {
    const [chartData, setChartData] = useState(
        [{ time: 0, energy: 12 },
        { time: 1, energy: 15 },
        { time: 2, energy: 10 },
        { time: 3, energy: 18 }]
    )
    const svgRef = useRef()
    

    // useEffect(()=>{
    //     const svg = d3.select(svgRef.current)
    //     .style('background','#d3d3d3')

    //     const xScale = d3.scaleLinear().domain([0,chartData.length-1]).range([0,400])
    //     const yScale = d3.scaleLinear().domain([0,100]).range([100,0])
    //     const scaleLine = d3.line().x((d,i)=>xScale(i)).y(yScale).curve(d3.curveCardinal)

    //     svg.selectAll('.line').data([chartData]).join('path')
    //     .attr('d',d=>scaleLine(d))
    //     .attr('fill', 'none')
    //     .attr('stroke', "steelblue")

    // },[chartData])


    return (
        // <div className="flex h-[100vh]">
        //     <svg ref={svgRef} width="400px" height="100px" className="m-auto"></svg>
        // </div>
        <div className="w-[40%]">
        <Line options={options} data={data}></Line>
        </div>
    )


}
export default LineChart;