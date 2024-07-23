import { useDispatch } from 'react-redux'
import './sideBarSettings.css'
import { setPage } from '../sideBar/sideBarSlice';
import { Back } from '../../assets/Back';
import { firstLetter } from '../../helpers/firstLetter';

function SideBarSettings() {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const dispatch = useDispatch();

    return (
        <>
            <div className='sideBar_header_wrapper'>
                <div className='sideBar_header'>
                    <button className='sideBar_back' onClick={() => dispatch(setPage({page: 'main'}))}><Back /></button>
                    <p>Settings</p>
                </div>
            </div>
            <div className='sideBar_setting_main'>
                <div className='sideBar_setting_avatar'>
                    <p className='avatar_firstLetter'>{firstLetter(currentUser.user.name)}</p>
                    <p className='avatar_name'>{currentUser.user.name}</p>
                </div>
            </div>
        </>
    )
}

export default SideBarSettings