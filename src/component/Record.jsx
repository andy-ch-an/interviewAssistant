import { useState, useEffect, useRef } from "react"
import '../../init'
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
    const [start, setStart] = useState(false)
    const [count, setCount] = useState(1)
    const [isRecord, setIsRecord] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const videoRef = useRef()
    const [src, setSrc] = useState()
    const [currentTime, setCurrentTime] = useState(0)
    const S3 = new AWS.S3({ region: "ap-southeast-1" })
    let audioScr = useRef()
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const [freq, setFreq] = useState([])
    // let analyser = audioContext.createAnalyser();


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    }, [])
    useEffect(() => {
        (count > 0 && start) && setTimeout(() => {
            setCount(preCount => preCount - 1)
        }, 1000);
        if (count === 0) {
            setIsRecord(true)
            console.log('start recording')
        }
    }, [count, start])

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
            



            // const message = await S3.upload(params).promise()
            // console.log(message)
            // const a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style = "display: none";
            // a.href = url;
            // a.download = "test.webm";
            // a.click();
            // window.URL.revokeObjectURL(url);
        }
        console.log(e)
    }
    useEffect(() => {
        if (isRecord) {
            const canvas = document.querySelector("canvas")
            const stream = canvas.captureStream(25)
            const option = { mimeType: "video/webm; codecs=vp9" }
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(async (stream) => {
                const mediaRecorder = new MediaRecorder(stream, option)
                let video = videoRef.current
                video.srcObject = stream
                mediaRecorder.ondataavailable = handleDataAvailable;
                mediaRecorder.start()
                await new Promise(resolve => setTimeout(resolve, 120000));
                mediaRecorder.stop()
                setIsFinish(true)
                stream.getTracks().forEach((track) => track.stop())
                console.log('finish recording')
            })
        }
    }, [isRecord])


    return (
        <>
            {!start && <>
                <h2 className="text-3xl text-center m-10">Instruction</h2>
                <p className="text-xl mt-3 w-[65%] m-auto">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus quaerat reiciendis maiores nostrum tempore dolorum, iusto rem, adipisci architecto totam ipsa possimus. Eius, quisquam! Modi aspernatur, exercitationem unde aliquam iusto ex numquam, odit maxime consectetur dolore molestias rem ratione voluptatem nemo quia. Eius minus itaque, veritatis corporis quod voluptatibus maiores delectus totam quos ad atque ratione eaque vitae at nihil non provident nulla officiis adipisci. Sed aut odio nemo et eligendi est laboriosam quas suscipit dolores, quod voluptatibus ipsa vel eum? Distinctio culpa molestiae quia accusamus, molestias incidunt cumque nesciunt ea quibusdam modi nulla neque, dolore enim tempore! Veritatis, ad. </p>
                <button onClick={() => setStart(true)} className="rounded-md bg-sky-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-sky-500 mt-3 m-auto block">Start</button>
            </>}
            {start && !isRecord &&
                <div className="h-[100vh] text-center align-middle text-9xl leading-[100vh]">
                    {count}
                </div>
            }
            {isRecord && !isFinish && <>
                <video ref={videoRef} className="m-auto mt-[calc((100vh-480px)/2)]" autoPlay muted></video>
                {/* <canvas></canvas> */}
                <FaceApi/>
                <button>Done!</button>
            </>
            }
            {isFinish && /*<Loader></Loader>*/
                <>
                    <video width={400} controls id='recording' onTimeUpdate={e => setCurrentTime(e.target.currentTime)}>
                        <source src={src} type='video/webm'></source>
                    </video>
                    <audio width={400} controls id='audio'>
                        <source src={src}></source>
                    </audio>
                    <EmotionLineChart currentTime={currentTime}></EmotionLineChart>
                    <FreqChart freq={freq} currentTime={currentTime}></FreqChart>
                </>
            }
        </>
    )
}
export default Record