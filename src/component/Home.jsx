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
      <div key={item.id} className="flex flex-col gap-y-2 mx-auto w-32">
        <Lottie className="w-[40px] mx-auto" animationData={item.name} />
        {item.id===1? <div className="text-s text-center leading-[17px]">{item.text}</div> : <div className="text-s text-center leading-[17px] w-[80px] mx-auto ">{item.text}</div>}
      </div>
    );
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
        <section id="body" className="font-HankRndRegular">
            {/* Flex container */}
            <div className="container flex-col mx-auto mt-40">
                <div className="tracking-semibold font-semibold text-center text-gray text-[48px] sm:text-[50px] md:text-[64px] lg:text-[72px]">
                    Hack your interview.
                </div>
                <div className="font-semibold text-center mt-3 text-darkerGray text-[20px] sm:text-[25px] md:text-[29px] lg:text-[32px]">
                    Practice Face to Face <a className="text-cyanBlue bg-lightestBlue p-1">Banking</a> Interview with Artificial Intelligence
                </div>
                <div className="flex flex-row mt-12 justify-center lg:px-[150px] xl:px-[350px]">
                    {outputAnimations}
                </div>
            </div>
        </section>
        <button onClick={()=>navigate("/QuestionBank")} type='button' className="mt-12 rounded-[11px] bg-lightRed w-80 h-16  text-[24px] font-HankRndBold text-white m-auto block">Start Hacking</button>
      </div>
    </>
  )
}
