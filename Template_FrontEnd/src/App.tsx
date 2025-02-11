import React, { Suspense } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IoIosHeart } from "react-icons/io"
import { SiRefinedgithub } from "react-icons/si"
import { SiGithubcopilot } from "react-icons/si"
import Loading from './components/Loading'
import NotFound from './components/404'
import DashBoard from './components/DashBoard'
import Product from './components/Product'

// this is Called as a Dynamic import it used for Lazy Loading 
const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
const FontPage = React.lazy(() => import('./pages/FontPage'))
const ColorCodePage = React.lazy(() => import('./pages/ColorCodePage'))
const ContactUs = React.lazy(() => import('./components/ContactUs'))

function App() {
  return (
    // App Property HTML tags
    <div className='app'>
      <BrowserRouter>
      {/* this is for Lazy Loading */}
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* this is for Path And Elements */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/Loading" element={<Loading/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Font-Face" element={<FontPage/>}/>
            <Route path="/Color-Code" element={<ColorCodePage/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/ContactUs" element={<ContactUs/>}/>
            <Route path="/Home/DashBoard" element={<DashBoard/>}/>
            <Route path="/Home/Template/:productName" element={<Product/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* this is the Developer Information HTML tags */}
      <div className='info'>
        <h1><IoIosHeart style={{ animation: 'rotateInfinite 1s linear infinite' }}/>Create By RanjithKumar</h1>
        <h1><SiRefinedgithub/>GitHub&nbsp;:&nbsp;<a target='_blank' href="https://github.com/Ranjithv88">&nbsp;&nbsp;https://github.com/Ranjithv88</a></h1>
        <h1><SiGithubcopilot/>PortFolio&nbsp;:&nbsp;<a target='_blank' href="https://personal-portfolio-phi-liard-20.vercel.app/">&nbsp;&nbsp;https://personal-portfolio-phi-liard-20.vercel.app/</a><IoIosHeart style={{ animation: 'rotateInfinite 1s linear infinite' }}/></h1>
      </div>
    </div>
  )
}

export default App

