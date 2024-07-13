import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../signup/signup.css'
import { Finish } from '../../assets/Finish.tsx'

function Login({ onLogin }: any) {
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async() => {
        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json();
            
            if(data.error) {
                setError(data.message)
                return
            }

            localStorage.setItem('user-threads', JSON.stringify(data));
            onLogin(data);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='auth_bg'>
            <div className='signup_body active'>
                <h1 className='auth_title'>Login</h1>
                <input type='text' className='text_input' placeholder='Email' value={inputs.email} onChange={e => setInputs({...inputs, email: e.target.value})} />
                <input type='text' className='text_input' placeholder='Password' value={inputs.password} onChange={e => setInputs({...inputs, password: e.target.value})} />
                <button className='auth_btn' onClick={handleLogin}>
                    <Finish />
                </button>
                <p className='error'>{error}</p>
            </div>
            <Link to='/signup' className='auth_link'>Don't have an account? Signup</Link>
        </div>
    )
}

export default Login