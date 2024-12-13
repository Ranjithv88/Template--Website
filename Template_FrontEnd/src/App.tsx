import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login01 from './components/Login01'
import Login from './components/Login'
import Register from './components/Register'
import Loading from './components/Loading'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login01" element={<Login01/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Loading" element={<Loading/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

