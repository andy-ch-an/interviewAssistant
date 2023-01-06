import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { BsChevronRight } from "react-icons/bs";
import { IoMdLock } from "react-icons/Io";

export const QuestionBank = () => {
  const navigate = useNavigate();
  const dataArray = [
    {
      id: 1,
      text: "Basic Interview Questions (3 Questions, 1 min per question)",
      unlocked: true
    },
    {
      id: 2,
      text: "Top 100 Behaviorial Questions (5 Questions, 1.5 min per question)",
      unlocked: false
    },
    {
      id: 3,
      text: "Top 100 Big4 Questions (5 Questions, 1.5 min per question)",
      unlocked: false
    },
    {
      id: 4,
      text: "Top 100 S&T Questions (5 Questions, 1.5 min per question)",
      unlocked: false
    },
  ]
  function clickEvent(id){
    id===1 && navigate("/Card");
  }
  const dataOutputs =  dataArray.map(data=>{
    return(
      <div  key = {data.id} onClick= {()=>{clickEvent(data.id)}} 
            className = {"px-6 flex border-2 w-[800px] h-[75px] justify-between mx-auto bg-white p-3 mb-6 items-center rounded-[6px]" + 
                        (data.unlocked?" cursor-pointer border-2 border-lightBlue": " opacity-30") }>
        <div className="font-HankRndBold text-[20px]">{data.text}</div>
        {data.unlocked?<BsChevronRight className="w-6 h-10 " />:<IoMdLock className="w-6 h-10" />}
      </div>
    )
  })

  return (
    <>
      {/* navbar */}
      <div className="bg-background h-screen">
      <nav className="relative mx-auto p-5 bg-white h-[10vh] box-border">
            <img src="logo.svg" alt="logo" className="cursor-pointer absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/")}/>
            <div className="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                interview hackers
            </div>
        </nav>
        {/* body */}
        <section id="body">
          <div className="flex justify-center items-center h-44 font-HankRndRegular text-[36px] text-darkerGray">
            Choose Question Bank
          </div>
          {dataOutputs}
        </section>
        
      </div>
    </>
  )
}
