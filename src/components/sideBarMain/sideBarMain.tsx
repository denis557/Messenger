import './sideBarMain.css'
import User from '../user/user';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPage } from '../sideBar/sideBarSlice';

function SideBarMain() {
    const { chats } = useSelector((state: any) => state.chat);
    const dispatch = useDispatch();

    return (
        <>
            <div className='sideBar_header'>
                <svg className='menu_btn' width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/> <path d="M2 15H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/> <path d="M2 28H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/></svg>
                <input className='sideBar_search' onClick={() => dispatch(setPage({page: 'search'}))} />
            </div>
            <div className='sideBar_main'>
                {chats.map((chat: any, index: number) => <User chat={chat} key={index} />)}
            </div>
        </>
    )
}

export default SideBarMain