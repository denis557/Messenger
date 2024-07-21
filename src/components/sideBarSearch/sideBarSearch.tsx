import './sideBarSearch.css'
import { Back } from '../../assets/Back'
import { NewGroup } from '../../assets/NewGroup';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPage } from '../sideBar/sideBarSlice';

function SideBarSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);
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
                    console.log(data)
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
                    ''}
            </div>
        </>
    )
}

export default SideBarSearch