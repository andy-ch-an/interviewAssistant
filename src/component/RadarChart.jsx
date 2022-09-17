import {Radar} from 'react-chartjs-2'
const data = {
    labels: [
        'Disgust',
        'Happiness',
        'Natural',
        'Surprise',
        'Fear',
        'Sadness',
        'Anger',
    ],
    datasets: [{
        data: [65, 59, 90, 81, 56, 55,0],
        label: 'EMOTION',
        fill: true,
        backgroundColor: 'rgba(47, 105, 117, 0.2)',
        borderColor: 'rgb(55, 93, 96)',
        pointBackgroundColor: 'rgb(55, 93, 96)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(55, 93, 96)'
    }]
};


const RadarChart = ()=>{
    return(
        <Radar data={data}/>
    )


}
export default RadarChart