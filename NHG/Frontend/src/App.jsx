
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import './App.css'
import HomePage from "./Pages/home";
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";
import VisionPage from "./Pages/About/Vision";
import OverviewPage from "./Pages/About/Overview";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signin' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path= '/about/vision-mission' element={<VisionPage/>} />
           <Route path= '/about/overview' element={<OverviewPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
