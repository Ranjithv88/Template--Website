import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Loading from './components/Loading'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Loading" element={<Loading/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

