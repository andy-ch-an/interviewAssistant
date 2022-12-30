import { useRef, useState, useEffect } from 'react'
import * as  faceapi from 'face-api.js'
import './FaceApi.css'
import { data } from 'autoprefixer';

export const dataArray = [];

const FaceApi = ()=>{
  const videoRef = useRef()
  const canvasRef = useRef()
  const videoHight = 0
  const videoWidth = 0


  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
      })
      .catch(err => {
        console.error("error:", err);
      });
  }


  const handleVideoOnPlay = async() => {

    const interval = setInterval(async () => {
          console.log('faceApi')
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
          faceapi.matchDimensions(canvasRef.current, { width: 720, height: 540 });
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, { width: 720, height: 540 });
          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.width, canvasRef.height)
          if(resizedDetections.length){
            dataArray.push(resizedDetections);
            console.log(resizedDetections)
          }
    },950 )
    await new Promise(resolve => setTimeout(resolve, 4000));
    clearInterval(interval)
}
  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(startVideo)
  },[])


  return (
    <div className="FaceDetection">
      <video ref={videoRef} onPlay={handleVideoOnPlay} height={videoHight} width={videoWidth} autoPlay muted></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default FaceApi;