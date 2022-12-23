import React from 'react'
import {useNavigate} from 'react-router-dom';
import { Card } from "./Card"

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* navbar */}
      <div class="bg-background h-w-full h-screen bg-dunes bg-cover bg-center">
        <nav class="relative mx-auto p-5 bg-white">
            <div class="flex items-center justify-between">
                <img src="logo.svg" alt="logo" />
                <div class="p-2 font-HankRnd tracking-widest font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                    interview hackers
                </div>
                <div/>
            </div>
        </nav>
        {/* body */}
        <section id="body" class="font-HankRnd">
            {/* Flex container */}
            <div class="container flex-col mx-auto mt-32">
                <div class="tracking-semibold font-semibold text-7xl text-center text-gray">
                    Hack your interview.
                </div>
                <div class="text-3xl font-semibold text-center p-5">
                    Practice Face to Face <a class="text-cyanBlue bg-lightestBlue p-1">Banking</a> Interview with Artificial Intelligence
                </div>
                <div class="flex flex-row gap-x-2 px-60 pt-10">
                    <Card icon={'script.svg'} description={'Interview Script Analysis'} />
                    <Card icon={'video.svg'} description={'Video Analysis'} />
                    <Card icon={'voice.svg'} description={'Voice Analysis'} />
                    <Card icon={'action.svg'} description={'Action Items'} />
                </div>
            </div>
        </section>
        <button onClick={()=>navigate("/QuestionBank")} type='button' className="mt-20 rounded-md bg-lightRed w-52 h-12 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white m-auto block">Start Hacking</button>
      </div>
    </>
  )
}
