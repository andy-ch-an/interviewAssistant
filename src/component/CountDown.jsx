import React, { useEffect, useState } from 'react';

function CountDown() {
  const [count, setCount] = useState(3);
  useEffect(()=>{
    setTimeout(()=>{setCount(prev=>prev-1)}, 1000)
  }, [count])
  return (
    <div className='bg-background'>
      <nav className="relative mx-auto p-5 bg-white h-[10vh] box-border">
            <img src="logo.svg" alt="logo" className="cursor-pointer absolute top-0 bottom-0 m-auto" onClick= {()=>navigate("/")}/>
            <div className="flex font-HankRndBold justify-center tracking-widest text-transparent text-3xl bg-clip-text bg-gradient-to-r from-lightBlue to-lightPurple">
                interview hackers
            </div>
      </nav>
      <div className='flex flex-col justify-center items-center h-[80vh]'>
        <div className='text-white rounded-full border-2 font-HankRndBold p-10 text-[120px] h-[300px] w-[300px] flex flex-col justify-center items-center bg-lightBlue '>
          {count}
        </div>
      </div>
      <div className='h-[10vh]' />
    </div>
    
  )
}

export default CountDown
