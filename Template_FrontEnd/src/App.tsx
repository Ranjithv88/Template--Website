import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import FeedBack from './components/FeedBack'
import Footer from './components/Footer'
import { div } from 'motion/react-client'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Home" element={<HomePage/>}/>
          <Route path="/Loading" element={<Loading/>}/>
          <Route path="/Home/FeedBack" element={<><NavBar/><FeedBack/><Footer/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

