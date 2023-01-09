import { useState, useEffect, useRef, useLayoutEffect } from "react";
import '../../init';
import { IconContext } from "react-icons";
import {BsRecordCircle} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';
import FaceApi from "./FaceApi";
import { v4 } from 'uuid';
import AWS from 'aws-sdk';
import EmotionLineChart from "./EmotionLineChart";
import FreqChart from "./FreqChart";
import CountDown from "./CountDown";
AWS.config.update({
    "accessKeyId": import.meta.env.VITE_accessKeyId,
    "secretAccessKey": import.meta.env.VITE_secretAccessKey,
    "region": "ap-southeast-1"
})



const Record = () => {
    const navigate = useNavigate();
    const videoRef = useRef();
    const [src, setSrc] = useState([]);
    const [id, setId] = useState('');
    const [userId, setUserId] = useState(v4())
    const [Recording, setRecording] = useState(false);
    const [timer, setTimer] = useState(60)
    const S3 = new AWS.S3({ region: "ap-southeast-1" });
    let audioScr = useRef();
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const [freq, setFreq] = useState([]);
    const [buttonColor, setButtonColor] = useState("Black");
    const [startRecording, setStartRecoding] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [startCountDown, setStartCountDown] = useState(false);
    const [startVid, setStartVid] = useState(true);
    const [currentTime, setCurrentTime] = useState(0)

    const getTranscript = async (id, videoLength, practiceId, index)=>{
        return await fetch("https://ip32juena3.execute-api.ap-southeast-1.amazonaws.com/default/speechToText", {
            method: "POST",
            body: JSON.stringify({id: id, videoLength: videoLength, practiceId: practiceId, index: index}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
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
                Key: id + ".webm"
            }
            let url = URL.createObjectURL(vod)
            setSrc(prev=>[...prev,url])
            console.log(`id:${id}`);
            

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
            await S3.upload(params).promise();
            await getTranscript(id, ((60-timer)*1000), userId, questionIndex); 
            console.log(id);
            }
            console.log(e);
        }

    let mediaRecordRef = useRef();
    let streamRef = useRef();

    useEffect(() => {
        if(startVid) {
            const canvas = document.querySelector("canvas")
            const stream = canvas.captureStream(25)
            const option = { mimeType: "video/webm; codecs=vp9" }
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(async (stream) => {
            const mediaRecorder = new MediaRecorder(stream, option)
            let video = videoRef.current
            video.srcObject = stream
            mediaRecordRef.current = mediaRecorder;
            
            console.log('start recording')
            console.log(mediaRecorder);
            console.log('finish recording')
            streamRef.current = stream;
        })
        }
    }, [startVid])

    useEffect(()=>{
        if(Recording){
            setId(v4());
            console.log(id);
            
            mediaRecordRef.current.start();
            console.log(mediaRecordRef.current)
        }
    }, [Recording]);

    useEffect(()=>{
        if(startRecording && !Recording){   
           
            console.log(`timer: ${timer}`);
            
            mediaRecordRef.current.ondataavailable = handleDataAvailable;
            console.log(id);
            mediaRecordRef.current.stop();
            streamRef.current.getTracks().forEach((track) => track.stop());
            setStartCountDown(true);
            setQuestionIndex(prev=>prev+1);
            setStartVid(false);
            setTimer(60);
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

      let outputResults;

      if(questionIndex === 3){
        outputResults = src.map((url)=>{
            return (
                <>
                    <video width={400} controls id='recording' onTimeUpdate={e => setCurrentTime(e.target.currentTime)}>
                        <source src={url} type='video/webm'></source>
                    </video>
                    <EmotionLineChart time={timer} currentTime={currentTime}></EmotionLineChart>
                    <FreqChart freq={freq} currentTime={currentTime}></FreqChart>
                </>
            )
        })
        }


    return (
        <>
            { questionIndex < 3 && !startCountDown && 
                <div className="bg-background relative">
                    <nav className="relative mx-auto p-5 bg-white h-[10vh] box-border">
                        <img src="logo.svg" alt="logo" className="cursor-pointer absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/")}/>
                        <div className="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                            interview hackers
                        </div>
                    </nav>
                    <div className="flex flex-col gap-y-[50px] pt-[40px] h-[90vh]  items-center pb-[20px] ">
                        <div className="font-HankRndRegular text-[30px] w-[800px] border-darkerGray py-[15px] border-[1px] text-center bg-white rounded-[10px] ">{threeQuestions[questionIndex]}</div>
                        <div className="flex">
                            <video ref={videoRef} autoPlay muted className="rounded-[10%] h-auto w-[600px]" />
                            <canvas className="absolute"/>
                            <FaceApi index={questionIndex}/>
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
            }
            { questionIndex < 3 && startCountDown &&
                <CountDown toggleStartCountDown={setStartCountDown} toggleStartVid={setStartVid} />
            }
            {
                questionIndex === 3 && 
                // <div className="flex">
                //     {outputResults}
                // </div>
                <>
                    <video width={400} controls id='recording' onTimeUpdate={e => setCurrentTime(e.target.currentTime)}>
                        <source src={src[0]} type='video/webm'></source>
                    </video>
                    <EmotionLineChart time={timer} currentTime={currentTime}></EmotionLineChart>
                    <FreqChart freq={freq} currentTime={currentTime}></FreqChart>
                </>
            }
        </>
    )
}

export default Record;