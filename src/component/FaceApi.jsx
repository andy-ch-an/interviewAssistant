import { useRef, useState, useEffect } from 'react'
import * as  faceapi from 'face-api.js'
import './FaceApi.css'
const FaceApi = ()=>{
  const videoRef = useRef()
  const canvasRef = useRef()
  const videoHight = 540
  const videoWidth = 720
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
  const handleVideoOnPlay = () => {
    setInterval(async () => {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        faceapi.matchDimensions(canvasRef.current, { width: 720, height: 540 });
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, { width: 720, height: 540 });
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.width, canvasRef.height)
        if(resizedDetections.length){
          console.log(resizedDetections)
        }
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
    }, 1000)
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