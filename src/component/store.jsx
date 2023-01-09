
{start && !isRecord &&
  <div className="h-[100vh] text-center align-middle text-9xl leading-[100vh]">
      {count}
  </div>
}
{isRecord && !isFinish && <>
  <video ref={videoRef} className="m-auto mt-[calc((100vh-480px)/2)]" autoPlay muted></video>
  <canvas></canvas>
  <FaceApi/>
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