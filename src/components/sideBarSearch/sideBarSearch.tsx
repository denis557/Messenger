import './sideBarSearch.css'
import { Back } from '../../assets/Back'
import { NewGroup } from '../../assets/NewGroup';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../sideBar/sideBarSlice';
import User from '../user/user';
import SearchedUser from '../searchedUser/searchedUser';

function SideBarSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);
    const { chats } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    function getUser(user) {
        chats.map(chat => chat.members[0]._id == user._id ? <User /> : '')
    }

    useEffect(() => {
        if(!searchInput && !users.length) {
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

    return (
        <>
            <div className='sideBar_header'>
                <button className='sideBar_back' onClick={() => dispatch(setPage({page: 'main'}))}><Back /></button>
                <input className='sideBarSearch_search' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            </div>
            <div className='sideBar_main'>
                {!searchInput ? 
                    <>
                        <div className='sideBar_newGroup'>
                            <NewGroup />
                            <p>New group</p>
                        </div>
                        <hr className='sideBar_search_hr' />
                    </>
                :
                    users.map((user: any) => chats.map((chat: any) => chat.members[0]._id === user._id ? <User chat={chat} /> : <SearchedUser user={user} />))}
            </div>
        </>
    )
}

export default SideBarSearch