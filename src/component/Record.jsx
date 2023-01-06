import { useState, useEffect, useRef, useLayoutEffect } from "react"
import '../../init'
import { IconContext } from "react-icons";
import {BsRecordCircle} from 'react-icons/bs'
import Loader from './Loader'
import FaceApi from "./FaceApi"
import { v4 } from 'uuid'
import AWS from 'aws-sdk'
import EmotionLineChart from "./EmotionLineChart"
import FreqChart from "./FreqChart"
AWS.config.update({
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": "ap-southeast-1"
})

const Record = () => {
    const videoRef = useRef();
    const [src, setSrc] = useState();
    const [Recording, setRecording] = useState(false);
    const [timer, setTimer] = useState(60)
    const S3 = new AWS.S3({ region: "ap-southeast-1" });
    let audioScr = useRef();
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const [freq, setFreq] = useState([]);
    const [buttonColor, setButtonColor] = useState("Black");
    const [startRecording, setStartRecoding] = useState(false);

    const threeQuestions = [
        "What is your name?",
        "What are your skills?",
        "Why are you interested for this job?"
    ]

    function invokeRecording() {
        setRecording(prev => !prev)
    }
    function toggleButton() {
        setButtonColor(Recording ?  "Black": "Red");
        console.log(buttonColor);
    }


    const handleDataAvailable = async (e) => {
        if (e.data.size) {
            const vod = new Blob([e.data], {
                type: "video/webm"
            });
            const params = {
                Body: vod,
                ContentType: 'video/webm',
                Bucket: 'interview-assistant-vod',
                Key: v4() + ".webm"
            }
            let url = URL.createObjectURL(vod)
            setSrc(url)
            

            let arrayBuf = await new Response(vod).arrayBuffer()
            let audioBuf = await audioContext.decodeAudioData(arrayBuf)
            
            let offline = new OfflineAudioContext(2, audioBuf.length, 44100)
            audioScr = offline.createBufferSource()
            audioScr.buffer = audioBuf
            let analyser = offline.createAnalyser()
            
            let scp = offline.createScriptProcessor(analyser.fftSize, 2, 2)
            audioScr.connect(analyser)
            scp.connect(offline.destination)
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            scp.onaudioprocess = function () {
                analyser.getByteFrequencyData(freqData)
                let temp = Array.from(freqData);
                setFreq(pre=>[...pre,temp]);
            };
            audioScr.start(0);
            offline.oncomplete = function (e) {
                console.log('analysed');
            };
            await offline.startRendering();
        }
        console.log(e)
    }

    let mediaRecordRef = useRef();
    let streamRef = useRef();

    useEffect(() => {
        const canvas = document.querySelector("canvas")
        const stream = canvas.captureStream(25)
        const option = { mimeType: "video/webm; codecs=vp9" }
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(async (stream) => {
            const mediaRecorder = new MediaRecorder(stream, option)
            let video = videoRef.current
            video.srcObject = stream
            mediaRecorder.ondataavailable = handleDataAvailable;
            console.log('start recording')
            mediaRecordRef.current = mediaRecorder;
            // mediaRecorder.start()
            // await new Promise(resolve => setTimeout(resolve, 5000));
            // mediaRecorder.stop();
            console.log('finish recording')
            streamRef.current = stream;
            
        })
    }, [])

    useLayoutEffect(()=>{
        if(Recording){
            
            mediaRecordRef.current.start();
            console.log(mediaRecordRef.current)
        }
    }, [Recording])
    useLayoutEffect(()=>{
        if(startRecording && !Recording){
            mediaRecordRef.current.stop();
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
    }, [startRecording, Recording])

    useEffect(() => {
        if(Recording)
        {
            if (!timer){
                setRecording(false);
            }
            const intervalId = setInterval(() => {
            setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
      }, [Recording, timer]);


    return (
        <div className="bg-background relative">
            <nav className="relative mx-auto p-5 bg-white h-[10vh] box-border">
                <img src="logo.svg" alt="logo" className="cursor-pointer absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/")}/>
                <div className="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                    interview hackers
                </div>
            </nav>
            <div className="flex flex-col gap-y-[50px] pt-[40px] h-[90vh]  items-center pb-[20px] ">
                <div className="font-HankRndRegular text-[30px] w-[800px] border-darkerGray py-[15px] border-[1px] text-center bg-white rounded-[10px] ">What is Your Name</div>
                <div className="flex">
                    <video ref={videoRef} autoPlay muted className="rounded-[10%] h-auto w-[600px]" />
                    <canvas className="absolute"/>
                    <FaceApi/>
                </div>
                <div className="flex w-[100vw] relative justify-center items-center">
                    <IconContext.Provider value={{ color: buttonColor }}>
                        <button onClick={()=>{invokeRecording(); toggleButton(); setStartRecoding(true);}}>
                            <BsRecordCircle className="h-[50px] w-auto bg-red" />
                        </button>
                    </IconContext.Provider>
                    <div className="absolute right-10 font-HankRndRegular">{`Time Left: ${timer}`}</div>
                </div>
                
            </div>
        </div> 
    )
}
export default Record