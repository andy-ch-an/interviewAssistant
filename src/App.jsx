import Record from "./component/Record"
import { Home } from "./component/Home"
import { QuestionBank } from "./component/QuestionBank";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FaceApi from "./component/FaceApi"
import Loader from "./component/Loader"
import EmotionLineChart from "./component/EmotionLineChart"

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/QuestionBank" element={<QuestionBank/>}/>
        </Routes>
      </Router>
      {/* <FaceApi></FaceApi> */}
      {/* <Loader></Loader> */}
      {/* <EmotionLineChart></EmotionLineChart> */}
    </>
  )
}

export default App
