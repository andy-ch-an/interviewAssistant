import React from 'react'
import {useNavigate} from 'react-router-dom';
import { BsChevronRight } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

export const QuestionBank = () => {
  const navigate = useNavigate();
  const dataArray = [
    {
      text: "Basic Interview Questions (3 Questions, 1 min per question)",
      unlocked: true
    },
    {
      text: "Top 100 Behaviorial Questions (5 Questions, 1.5 min per question)",
      unlocked: false
    },
    {
      text: "Top 100 Big4 Questions (5 Questions, 1.5 min per question)",
      unlocked: false
    },
    {
      text: "Top 100 S&T Questions (5 Questions, 1.5 min per question)",
      unlocked: false
    },
  ]

  const dataOutputs =  dataArray.map(data=>{
    return(
      <div onClick= {()=>navigate("/instruction")} class={"flex border-2 w-[800px] justify-between mx-auto bg-white p-3 mb-6 items-center rounded-[6px]" + (data.unlocked?" border-2 border-lightBlue": " opacity-30") }>
        <div class="font-HankRndBold text-[20px]">{data.text}</div>
        {data.unlocked?<BsChevronRight class="w-6 h-10 " />:<AiFillLock class="w-6 h-10" />}
      </div>
    )
  })

  return (
    <>
      {/* navbar */}
      <div class="bg-background h-screen">
      <nav class="relative mx-auto p-5 bg-white">
            <img src="logo.svg" alt="logo" class="absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/")}/>
            <div class="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                interview hackers
            </div>
        </nav>
        {/* body */}
        <section id="body">
          <div class="flex justify-center items-center h-44 font-HankRndRegular text-[36px] text-darkerGray">
            Choose Question Bank
          </div>
          {dataOutputs}
        </section>
        
      </div>
    </>
  )
}
