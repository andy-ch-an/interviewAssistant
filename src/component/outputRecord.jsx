import React from 'react'

export const outputRecord = () => {
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
