import React from 'react'
import axios from 'axios'

const OutputRecord = () => {
  const obj = {

  }
  async () =>{
    try {
      const response = axios.post('https://ip32juena3.execute-api.ap-southeast-1.amazonaws.com/default/speechToText')
    } catch (error) {
      
    }
  }
  return (
    <>
      <video width={400} controls id='recording' onTimeUpdate={e => setCurrentTime(e.target.currentTime)}>
          <source src={src} type='video/webm'></source>
      </video>
      <audio width={400} controls id='audio'>
          <source src={src}></source>
      </audio>
      <EmotionLineChart></EmotionLineChart>
      <FreqChart freq={freq} currentTime={currentTime}></FreqChart>
    </>
  )
}

export default OutputRecord;
