import React from 'react'

function Instruction() {
  return (
    <div>
      <nav className="relative mx-auto p-5 bg-white h-[10vh] box-border" >
          <img src="logo.svg" alt="logo" className="cursor-pointer absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/")}/>
          <div className="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
              interview hackers
          </div>
      </nav>
      <div className='flex h-[80vh] flex-col items-center justify-center bg-background'>
          <div>
            <h2 className="text-3xl text-center mb-10 font-HankRndRegular text-[40px]">Click to begin an Interview Question</h2>
            <button onClick={()=>{ setStart(true);}} className="rounded-[10px] bg-sky-600 py-2 px-3 text-[28px] font-HankRndBold text-white hover:bg-sky-500 w-[300px] h-[70px] m-auto block">Start</button>
          </div>
      </div>
      <div className='h-[10vh]' />
    </div>
  )
}

export default Instruction