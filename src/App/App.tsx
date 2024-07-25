import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Main from '../pages/main/main'
import Login from '../pages/login/login'
import Signup from '../pages/signup/signup'

const socket = socketIO('http://localhost:5000')

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  avatar?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user-threads');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user?._id ? <Main /> : <Navigate to='/signup' />} />
        <Route path='/login' element={!user?._id ? <Login onLogin={(user: User) => setUser(user)} /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user?._id ? <Signup onSignup={(user: User) => setUser(user)} /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
