import React from 'react'
import {useNavigate} from 'react-router-dom';
import Lottie from "lottie-react";
import Analysis from "../Animation/Analysis.json";
import Goal from "../Animation/Goal.json";
import Network from "../Animation/Network.json";
import Talk from "../Animation/Talk.json";

export const Home = () => {
  const navigate = useNavigate();
  const animationArray = [
    {
      id: 1,
      name: Analysis,
      text: "Interview Script Analysis"
    },
    {
      id:2,
      name: Goal, 
      text: "Video Analysis"
    },
    {
      id:3,
      name: Network,
      text: "Voice Analysis"
    },
    {
      id:4,
      name: Talk,
      text: "Action Items"
    }
  ]
  const outputAnimations = animationArray.map((item)=>{
    return(
      <div key={item.id} class="flex flex-col gap-y-2 mx-auto w-32">
        <Lottie class="w-[40px] mx-auto" animationData={item.name} />
        {item.id===1? <div class="text-s text-center leading-[17px]">{item.text}</div> : <div class="text-s text-center leading-[17px] w-[80px] mx-auto ">{item.text}</div>}
      </div>
    );
  })
  return (
    <>
      {/* navbar */}
      <div class="bg-background h-screen">
      <nav class="relative mx-auto p-5 bg-white">
            <img src="logo.svg" alt="logo" class="absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/Record")}/>
            <div class="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                interview hackers
            </div>
        </nav>
        {/* body */}
        <section id="body" class="font-HankRndRegular">
            {/* Flex container */}
            <div class="container flex-col mx-auto mt-40">
                <div class="tracking-semibold font-semibold text-[72px] text-center text-gray">
                    Hack your interview.
                </div>
                <div class="text-[32px] font-semibold text-center mt-3 text-darkerGray">
                    Practice Face to Face <a class="text-cyanBlue bg-lightestBlue p-1">Banking</a> Interview with Artificial Intelligence
                </div>
                <div class="flex flex-row px-80 mt-12">
                    {outputAnimations}
                </div>
            </div>
        </section>
        <button onClick={()=>navigate("/QuestionBank")} type='button' className="mt-12 rounded-[11px] bg-lightRed w-80 h-16  text-[24px] font-HankRndBold text-white m-auto block">Start Hacking</button>
      </div>
    </>
  )
}
