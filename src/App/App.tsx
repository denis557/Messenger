import socketIO from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import './App.css'
const socket = socketIO('http://localhost:5000');

function App() {
  return (
    <Routes>
      <Route path='/'></Route>
      <Route path='/chat'></Route>
    </Routes>
  )
}

export default App
