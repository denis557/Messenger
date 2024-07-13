import './signup.css'
import { Next } from '../../assets/Next.tsx'
import { Prev } from '../../assets/Prev.tsx'
import { Finish } from '../../assets/Finish.tsx'
import { Eye } from '../../assets/Eye.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Signup({ onSignup }: any) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [error, setError] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        name: '',
        bio: '',
        email: '',
        password: '',
        username: ''
    });

    const navigate = useNavigate()

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

            if(data.error) {
                setError(data.message);
                return
            }
            
            localStorage.setItem('user-threads', JSON.stringify(data));
            onSignup(data);
            // navigate('/');
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
                <input type='text' className='text_input' placeholder='Enter your name' value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value})} />
                <input type='text' className='text_input' placeholder='Tell about you (optional)' value={inputs.bio} onChange={e => setInputs({ ...inputs, bio: e.target.value})} />
                <button className='auth_btn' onClick={() => setSlideIndex(1)}>
                    <Next />
                </button>
                {error && <p className='error'>{error}</p>}
            </div>
            <div className={`signup_body ${slideIndex === 1 && 'active'}`}>
                <h1 className='auth_title'>Create account</h1>
                <input type='email' className='text_input' placeholder='Email' value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value})} />
                <div className='text_input_div'>
                    <input type={isShowPassword ? 'text' : 'password'} className='password_input' placeholder='Password' value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value})} />
                    <Eye isShowPassword={isShowPassword} setIsShowPassword={setIsShowPassword} />
                </div>
                <input type='text' className='text_input' placeholder='Username' value={inputs.username} onChange={e => setInputs({ ...inputs, username: e.target.value})} />
                <div className='auth_btn_div'>
                    <button className='auth_btn prev' onClick={() => setSlideIndex(0)}>
                        <Prev />
                    </button>
                    <button className='auth_btn' onClick={handleSignup}>
                        <Finish />
                    </button>
                </div>
                {error && <p className='error'>{error}</p>}
            </div>
            <Link to='/login' className='auth_link'>Already have an account? Login</Link>
        </div>
    )
}

export default Signup