import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../signup/signup.css'
import { Finish } from '../../assets/Finish.tsx'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return(
        <div className='auth_bg'>
            <div className='signup_body active'>
                <h1 className='auth_title'>Login</h1>
                <input type='text' className='text_input' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <input type='text' className='text_input' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <button className='auth_btn'>
                    <Finish />
                </button>
            </div>
            <Link to='/signup' className='auth_link'>Don't have an account? Signup</Link>
        </div>
    )
}

export default Login