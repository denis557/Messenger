import socketIO from 'socket.io-client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import './App.css'
import { useEffect, useState } from 'react';
const socket = socketIO('http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user-threads');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Main /> : <Navigate to='/signup' />} />
        <Route path='/login' element={!user ? <Login onLogin={(user: any) => setUser(user)} /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup onSignup={(user: any) => setUser(user)} /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
