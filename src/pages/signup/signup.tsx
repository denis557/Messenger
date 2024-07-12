import './signup.css'
import { Next } from '../../assets/Next.tsx'
import { Prev } from '../../assets/Prev.tsx'
import { Finish } from '../../assets/Finish.tsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Signup() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [inputs, setInputs] = useState({
        name: '',
        bio: '',
        email: '',
        password: '',
        username: ''
    });

    const handleSignup = async () => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json();
            
            localStorage.setItem('user-threads', JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='auth_bg'>
            <div className={`signup_body ${slideIndex === 0 && 'active'}`}>
                <h1>About you</h1>
                <input type='file' id='file_input' />
                <label htmlFor='file_input'></label>
                <input type='text' className='text_input' placeholder='Enter your name' onChange={e => setInputs({ ...inputs, name: e.target.value})} />
                <input type='text' className='text_input' placeholder='Tell about you' onChange={e => setInputs({ ...inputs, bio: e.target.value})} />
                <button className='auth_btn' onClick={() => setSlideIndex(1)}>
                    <Next />
                </button>
            </div>
            <div className={`signup_body ${slideIndex === 1 && 'active'}`}>
                <h1 className='auth_title'>Create account</h1>
                <input type='email' className='text_input' placeholder='Email' onChange={e => setInputs({ ...inputs, email: e.target.value})} />
                <input type='password' className='text_input' placeholder='Password' onChange={e => setInputs({ ...inputs, password: e.target.value})} />
                <input type='text' className='text_input' placeholder='Username' onChange={e => setInputs({ ...inputs, username: e.target.value})} />
                <div className='auth_btn_div'>
                    <button className='auth_btn prev' onClick={() => setSlideIndex(0)}>
                        <Prev />
                    </button>
                    <button className='auth_btn' onClick={handleSignup}>
                        <Finish />
                    </button>
                </div>
            </div>
            <Link to='/login' className='auth_link'>Already have an account? Login</Link>
        </div>
    )
}

export default Signup