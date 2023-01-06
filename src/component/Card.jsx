import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export const Card = () => {
  const navigate = useNavigate();
  

  return (
    <div className="bg-background h-screen">
      <nav className="cursor-pointer relative mx-auto p-5 bg-white h-[10vh] box-border" onClick= {()=>navigate("/")}>
          <img src="logo.svg" alt="logo" className="absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/Record")}/>
          <div className="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
              interview hackers
          </div>
      </nav>
      <div className='flex flex-col items-center justify-center gap-y-16 h-[90vh]'>
          <div className='flex flex-col justify-between w-[400px] h-[420px] p-[20px] rounded-[10px] bg-white box-border border-lightestGray border-[1px] hover:shadow-md hover:shadow-blue-500/30'>
          <img src="https://gsb.hse.ru/pubs/share/direct/408305373.png" alt ="image" className="w-[350px] rounded-[10px] mx-auto" />
          <div className='flex flex-col justify-between text-center h-[160px] border-box'>
            <div className="font-HankRndBold text-[20px] mt-[10px]">Answer 3 interview questions</div>
            <div className="font-HankRndRegular text-[15px]">When you're done, review your answers and discover insights.</div>
            <button onClick={()=>{navigate("/Record")}} className="mt-[10px] rounded-[10px] bg-sky-600 w-[320px] mx-auto h-[50px] text-[20px] text-white  hover:bg-sky-500">Start</button>
          </div>
        </div>
        <button className='block w-[200px] h-[60px] font-HankRndRegular rounded-[10px] hover:bg-white hover:shadow-md'>
          See All Questions
        </button>
      </div>
      
    </div>
  )
}
