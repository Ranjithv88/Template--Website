import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Loading from './components/Loading'
import HomePage from './HomePage'
import FontPage from './FontPage'
import Footer01 from './components/Footer01'

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
          <Route path="/Footer01" element={<Footer01/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

