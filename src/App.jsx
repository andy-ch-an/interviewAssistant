import Record from "./component/Record"
import { Home } from "./component/Home"
import { QuestionBank } from "./component/QuestionBank"
import { Card } from "./component/Card";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FaceApi from "./component/FaceApi"
import Loader from "./component/Loader"
import EmotionLineChart from "./component/EmotionLineChart"
import Instruction from "./component/Instruction";
import CountDown from "./component/CountDown";

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/QuestionBank" element={<QuestionBank/>}/>
          <Route exact path="/Card" element={<Card />}/>
          <Route exact path="/Record" element={<Record />}/>    
          <Route exact path="/Record" element={<Instruction/>}/> 
          <Route exact path="/Count" element={<CountDown />}/> 
        </Routes>
      </Router>
      {/* <Loader></Loader> */}
      {/* <EmotionLineChart></EmotionLineChart> */}
    </>
  )
}

export default App
