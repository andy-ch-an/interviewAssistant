import { useState, useEffect } from "react"

const Record = () => {
    const [start, setStart] = useState(false)
    const [count, setCount] = useState(5)
    const [isRecord, setIsRecord] = useState(false)
    useEffect(()=>{
        (count>0 && start) && setTimeout(() => {
            setCount(preCount=>preCount-1)
        }, 1000);
    },[count,start])

    return (
        <>
            {!start && <>
                <h2 className="text-3xl text-center m-10">Instruction</h2>
                <p className="text-xl mt-3 w-[65%] m-auto">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus quaerat reiciendis maiores nostrum tempore dolorum, iusto rem, adipisci architecto totam ipsa possimus. Eius, quisquam! Modi aspernatur, exercitationem unde aliquam iusto ex numquam, odit maxime consectetur dolore molestias rem ratione voluptatem nemo quia. Eius minus itaque, veritatis corporis quod voluptatibus maiores delectus totam quos ad atque ratione eaque vitae at nihil non provident nulla officiis adipisci. Sed aut odio nemo et eligendi est laboriosam quas suscipit dolores, quod voluptatibus ipsa vel eum? Distinctio culpa molestiae quia accusamus, molestias incidunt cumque nesciunt ea quibusdam modi nulla neque, dolore enim tempore! Veritatis, ad. </p>
                <button onClick={() => setStart(true)} className="rounded-md bg-sky-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-sky-500 mt-3 m-auto block">Start</button>
            </>}
            {start &&
                <div className="h-[100vh] text-center align-middle text-9xl leading-[100vh]">
                    {count}
                </div>

            }
        </>
    )
}
export default Record