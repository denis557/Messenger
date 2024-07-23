import './header.css';
// import Logout from '../logout';
import { useSelector } from 'react-redux';
import { firstLetter } from '../../helpers/firstLetter';
import { useSocket } from '../../../server/context/socketContext';
import { Saved } from '../../assets/Saved';
import { Search } from '../../assets/Search';
import { More } from '../../assets/More';
import { Menu, Item, useContextMenu, Separator } from 'react-contexify';
import { Select } from '../../assets/Select';
import { Block } from '../../assets/Block';
import { Delete } from '../../assets/Delete';

const CHAT_MENU_ID = 'chat_menu_id';

function Header() {
  const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
  const { selectedUser } = useSelector(state => state.user);
  const { searchedUser } = useSelector(state => state.searchedUser);
  const {onlineUsers} = useSocket();

  const { show } = useContextMenu({
    id: CHAT_MENU_ID
  });

  function handleItemClick({ event, props, triggerEvent, data }){
    console.log(event, props, triggerEvent, data );
  }

  function displayMenu(e){
    show({
      event: e,
      // position: {
      //   x: 1530,
      //   y: 55
      // }
    });
}

  return(
    <div className='header'>
      {selectedUser.userId !== currentUser?.user?._id ? 
        (selectedUser.userId || searchedUser.searchedUser?._id) && 
          <>
            <div className='header_user'>
              <div className='header_avatar'>{firstLetter(selectedUser.username || searchedUser.searchedUser?.name)}</div>
              <div>
                <p className='header_username'>{selectedUser.username || searchedUser.searchedUser?.name}</p>
                <p className='header_status'>{selectedUser.userId ? onlineUsers.includes(selectedUser.userId) ? 'Online' : 'Offline' : 'Last seen recently'}</p>
              </div>
            </div>
            <div className='header_icons'>
              <Search />
              <button onClick={displayMenu} className='more_btn'>
                <More />
              </button>
            </div>
          </>
      :
        <>
          <div className='header_user'>
            <div className='header_avatar saved'><Saved isHeader={true} /></div>
            <p className='header_username'>Saved</p>
          </div>
          <div className='header_icons'>
            <Search />
            <button onClick={displayMenu} className='more_btn'>
              <More />
            </button>
          </div>
        </>
      }

      <Menu id={CHAT_MENU_ID} className='chat_menu' animation={null} >
        <Item onClick={handleItemClick} className='chat_menu_item'>
          <Select />
          <p>Select messages</p>
        </Item>
        <Item onClick={handleItemClick} className='chat_menu_item'>
          <Block />
          <p>Block user</p>
        </Item>
        <Separator />
        <Item onClick={handleItemClick} className='chat_menu_item'>
          <Delete />
          <p className='chat_menu_red_p'>Delete chat</p>
        </Item>
      </Menu>
    </div>
  )
}

export default Header