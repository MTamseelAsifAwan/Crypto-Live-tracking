import React from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Login from './Components/Login';
import Signin from './Components/Signin';
import App from './App';
const Indexmain = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={< App/>} />
        <Route path="/Signup" element={<Signin />} />
        <Route path="/Home" element={<App />} />
    </Routes>
  
    </Router>
  )
}

export default Indexmain