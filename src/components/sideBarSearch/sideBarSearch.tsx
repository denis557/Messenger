import './sideBarSearch.css'
import { Back } from '../../assets/Back'
import { NewGroup } from '../../assets/NewGroup';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../sideBar/sideBarSlice';
import User from '../user/user';
import SearchedUser from '../searchedUser/searchedUser';
import { SearchGradient } from '../../assets/SearchGradient';

function SideBarSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);
    const { chats } = useSelector(state => state.chat);
    const dispatch = useDispatch();

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
                {/* <input className='sideBarSearch_search' value={searchInput} onChange={e => setSearchInput(e.target.value)} /> */}
                <div className='sideBarSearch_search' value={searchInput} onChange={e => setSearchInput(e.target.value)}>
                    <SearchGradient />
                    <input />
                </div>
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
                    users.map((user: any, index: number) => {
                        const isChat = chats.find((chat: any) => chat.members.some((member: any) => member._id === user._id));

                        if(isChat) {
                            if(user.name.includes(searchInput)) {
                                return <User key={index} chat={isChat} />
                            }
                        } else {
                            if(user.username.includes(searchInput)) {
                                return <SearchedUser key={index} user={user} />
                            }
                        }
                    })
                }
            </div>
        </>
    )
}

export default SideBarSearch