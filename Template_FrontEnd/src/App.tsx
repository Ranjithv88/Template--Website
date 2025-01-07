import React, { Suspense } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import NotFound from './components/404'
const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'))
const HomePage = React.lazy(() => import('./HomePage'))
const FontPage = React.lazy(() => import('./FontPage'))
const ColorCodePage = React.lazy(() => import('./ColorCodePage'))
const ContactUs = React.lazy(() => import('./components/ContactUs'))
import DashBoard from './components/DashBoard'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/Loading" element={<Loading/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Font-Face" element={<FontPage/>}/>
            <Route path="/Color-Code" element={<ColorCodePage/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/ContactUs" element={<ContactUs/>}/>
            <Route path="/Home/DashBoard" element={<DashBoard/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App

