import socketIO from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import Chat from '../pages/chat/chat';
import './App.css'
const socket = socketIO('http://localhost:5000');

function App() {
  return (
    <Routes>
      <Route path='/' element={<Chat />}></Route>
      {/* <Route path='/login'></Route>
      <Route path='/signup'></Route> */}
    </Routes>
  )
}

export default App
