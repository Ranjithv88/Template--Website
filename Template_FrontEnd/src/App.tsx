import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Loading from './components/Loading'
import HomePage from './HomePage'
import FontPage from './FontPage'
import ColorCodePage from './ColorCodePage'
import NotFound from './components/404'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Loading" element={<Loading/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/Font-Face" element={<FontPage/>}/>
          <Route path="/Color-Code" element={<ColorCodePage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

