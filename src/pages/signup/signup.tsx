import './signup.css'
import { Next } from '../../assets/Next.tsx'
import { Link } from 'react-router-dom'

function Signup() {
    return(
        <div className='auth_bg'>
            <div className='signup_body'>
                <h1>About you</h1>
                <input type='file' id='file_input' />
                <label htmlFor='file_input'></label>
                <input type='text' className='text_input' placeholder='Enter your name' />
                <input type='text' className='text_input' placeholder='Tell about you' />
                <button className='auth_btn'>
                    <Next />
                </button>
            </div>
            <Link to='/login'>Already have an account? Login</Link>
        </div>
    )
}

export default Signup