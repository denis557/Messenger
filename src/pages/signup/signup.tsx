import './signup.css'
import { Next } from '../../assets/Next.tsx'
import { Prev } from '../../assets/Prev.tsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Signup() {
    const [slideIndex, setSlideIndex] = useState(0);
    console.log(slideIndex)

    const changeSlideIndex = () => {
        if(slideIndex === 0) {
            setSlideIndex(1)
        } else if(slideIndex === 1) {
            setSlideIndex(0);
        }
    }

    return(
        <div className='auth_bg'>
            <div className={`signup_body ${slideIndex === 0 && 'active'}`}>
                <h1>About you</h1>
                <input type='file' id='file_input' />
                <label htmlFor='file_input'></label>
                <input type='text' className='text_input' placeholder='Enter your name' />
                <input type='text' className='text_input' placeholder='Tell about you' />
                <button className='auth_btn' onClick={changeSlideIndex}>
                    <Next />
                </button>
            </div>
            <div className={`signup_body ${slideIndex === 1 && 'active'}`}>
                <h1 className='auth_title'>Create account</h1>
                <input type='email' className='text_input' placeholder='Email' />
                <input type='password' className='text_input' placeholder='Password' />
                <input type='text' className='text_input' placeholder='ID' />
                <button className='auth_btn prev' onClick={changeSlideIndex}>
                    <Prev />
                </button>
            </div>
            <Link to='/login' className='auth_link'>Already have an account? Login</Link>
        </div>
    )
}

export default Signup