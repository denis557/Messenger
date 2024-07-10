import socketIO from 'socket.io-client'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import './App.css'
const socket = socketIO('http://localhost:5000');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
