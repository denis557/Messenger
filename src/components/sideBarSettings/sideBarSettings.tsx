import { useDispatch } from 'react-redux'
import './sideBarSettings.css'
import { setPage } from '../sideBar/sideBarSlice';
import { Back } from '../../assets/Back';
import { firstLetter } from '../../helpers/firstLetter';
import { About } from '../../assets/About';
import { Id } from '../../assets/Id';
import { Email } from '../../assets/Email';
import { useEffect, useState } from 'react';
import { Logout } from '../../assets/Logout';

function SideBarSettings() {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const [emailError, setEmailError] = useState('');
    const [idError, setIdError] = useState('');
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: currentUser.user.name,
        about: currentUser.user.bio,
        id: currentUser.user.username,
        email: currentUser.user.email
    });
    const [noChangesProvided, setNoChangesProvided] = useState(false);

    const handleEmailInput = (e) => {
        const newEmail = e.target.value
        setUserInfo(u => ({ ...u, email: newEmail}))
        const isEmail = users.find((user: any) => user.email === newEmail);
        if(isEmail) {
            setEmailError('User with this email already exists')
            return
        }
        if(!newEmail) {
            setEmailError('Please enter your email')
            return
        }
        setEmailError('')
    }

    const handleIdInput = (e) => {
        const newId = e.target.value;
        setUserInfo(u => ({ ...u, id: newId}))
        const isId = users.find((user: any) => user.username === newId);
        if(isId) {
            setIdError('User with this ID already exists')
            return;
        }
        if(!newId) {
            setIdError('Please enter your ID')
            return;
        }
        setIdError('');
    }

    const handleLogout = async () =>  {
        try {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const data = await res.json()
            localStorage.removeItem('user-threads');
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            const res = await fetch('/api/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: userInfo.name,
                    about: userInfo.about,
                    id: userInfo.id,
                    email: userInfo.email
                })
            })
            const data = await res.json();
            localStorage.setItem('user-threads', JSON.stringify(data))
            dispatch(setPage({page: 'main'}))
        } catch (error: any) {
            console.log(error.message)   
        }
    }

    useEffect(() => {
        if(!users.length) {
            const getUsers = async () => {
                try {
                    const res = await fetch('/api/message/users');
                    const data = await res.json();
                    if(data.error) {
                        console.log(data.error);
                        return
                    }
                    setUsers(data.users)
                } catch (error) {
                    console.log(error);
                }
            }
            getUsers();
        }
    }, [])

    useEffect(() => {
        setNoChangesProvided((userInfo.name === currentUser.user.name) && 
        (userInfo.about === currentUser.user.bio) &&
        (userInfo.id === currentUser.user.username) &&
        (userInfo.email === currentUser.user.email))
    }, [userInfo])

    return (
        <>
            <div className='sideBar_header_wrapper'>
                <div className='sideBar_header'>
                    <button className='sideBar_back' onClick={() => dispatch(setPage({page: 'main'}))}><Back /></button>
                    <p className='settings_title'>Settings</p>
                    {(!noChangesProvided && !emailError && !idError) ? 
                        <button className='setting_save' onClick={handleUpdate}>Save</button>
                    :
                        <p className='settings_tip'>Click to edit something</p>}
                </div>
            </div>
            <div className='sideBar_setting_main'>
                <div className='sideBar_setting_avatar'>
                    <p className='avatar_firstLetter'>{firstLetter(currentUser.user.name)}</p>
                    <input className='avatar_name' type='text' value={userInfo.name} onChange={e => setUserInfo(u => ({ ...u, name: e.target.value}))} />
                </div>
                <div className='sideBar_settings_inputs'>
                    <div className='sideBar_settings_div'>
                        <About />
                        <div className='settings_div'>
                            <textarea placeholder='About you' value={userInfo.about} onChange={e => setUserInfo(u => ({ ...u, about: e.target.value}))} />
                            <p>About</p>
                        </div>
                    </div>
                    <div className='sideBar_settings_div'>
                        <Id />
                        <div className='settings_div'>
                            <input type='text' value={userInfo.id} onChange={handleIdInput} />
                            <p>ID</p>
                        </div>
                    </div>
                    {idError && <p className='settings_error'>{idError}</p>}
                    <div className='sideBar_settings_div'>
                        <Email />
                        <div className='settings_div'>
                            <input type='email' value={userInfo.email} onChange={handleEmailInput} />
                            <p>Email</p>
                        </div>
                    </div>
                    {emailError && <p className='settings_error'>{emailError}</p>}
                </div>
            </div>
            <div className='sideBar_settings_logout' onClick={handleLogout}>
                <Logout />
                <p>Logout</p>
            </div>
        </>
    )
}

export default SideBarSettings