
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import './App.css'
import HomePage from "./Pages/home";
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signin' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
