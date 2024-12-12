import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Homepage from './components/Homepage'
import Loading from './components/Loading'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Home" element={<Homepage/>}/>
          <Route path="/Loading" element={<Loading/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

