import './sideBarMain.css'
import User from '../user/user';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPage } from '../sideBar/sideBarSlice';
import SavedMessages from '../savedMessages/savedMessages';
import { Menu, Item, useContextMenu } from 'react-contexify';
import { Settings } from '../../assets/Settings';
import { Info } from '../../assets/Info';
import { Moon } from '../../assets/Moon';
import { SavedMenu } from '../../assets/SavedMenu';
import { MenuSidebar } from '../../assets/MenuSidebar';
import { selectUser } from '../user/userSlice';
import { setSearchedUser } from '../chat/searchedUserSlice';
import 'react-contexify/ReactContexify.css';

const SIDEBAR_MENU_ID = 'sidebar_menu_id';

function SideBarMain() {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const { chats } = useSelector((state: any) => state.chat);
    const savedMessages = chats.find(chat => !chat.members.length);
    const dispatch = useDispatch();

    const { show } = useContextMenu({
        id: SIDEBAR_MENU_ID
    });

    function handleItemClick({ event, props, triggerEvent, data }){
        console.log(event, props, triggerEvent, data );
    }

    function displayMenu(e){
        show({
          event: e,
        });
    }

    return (
        <>
            <div className='sideBar_header'>
                <button onClick={displayMenu} className='menu_btn'>
                    <MenuSidebar />
                </button>
                <input className='sideBar_search' onClick={() => dispatch(setPage({page: 'search'}))} />
            </div>
            <div className='sideBar_main'>
                {chats.map((chat: any, index: number) => chat.members.length ? <User chat={chat} key={index} /> : <SavedMessages chat={chat} key={index} />)}
            </div>

            <Menu id={SIDEBAR_MENU_ID} className='sidebar_menu' animation='fade'>
                {/* <Item onClick={() => {
                    dispatch(selectUser({ selectedUser: {_id: savedMessages._id, userId: currentUser?.user?._id, username: 'Saved'} }));
                    dispatch(setSearchedUser({ searchedUser: { _id: '', name: '', avatar: '' } }));
                }} className='sidebar_menu_item'>
                    <SavedMenu />
                    <p>Saved messages</p>
                </Item>
                <Item onClick={handleItemClick} className='sidebar_menu_item'>
                    <Moon />
                    <p>Dark mode</p>
                </Item>
                <Item onClick={() => dispatch(setPage({page: 'settings'}))} className='sidebar_menu_item'>
                    <Settings />
                    <p>Settings</p>
                </Item>
                <Item onClick={handleItemClick} className='sidebar_menu_item'>
                    <Info />
                    <p>Info</p>
                </Item> */}
                <div onClick={() => {
                    dispatch(selectUser({ selectedUser: {_id: savedMessages._id, userId: currentUser?.user?._id, username: 'Saved', avatar: ''} }));
                    dispatch(setSearchedUser({ searchedUser: { _id: '', name: '', avatar: '' } }));
                }} className='sidebar_menu_item'>
                    <SavedMenu />
                    <p>Saved messages</p>
                </div>
                <div onClick={handleItemClick} className='sidebar_menu_item'>
                    <Moon />
                    <p>Dark mode</p>
                </div>
                <div onClick={() => dispatch(setPage({page: 'settings'}))} className='sidebar_menu_item'>
                    <Settings />
                    <p>Settings</p>
                </div>
                <div onClick={handleItemClick} className='sidebar_menu_item'>
                    <Info />
                    <p>Info</p>
                </div>
            </Menu>
        </>
    )
}

export default SideBarMain