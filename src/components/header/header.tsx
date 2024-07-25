import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { firstLetter } from '../../helpers/firstLetter';
import { useSocket } from '../../../server/context/socketContext';
import { Saved } from '../../assets/Saved';
import { Search } from '../../assets/Search';
import { More } from '../../assets/More';
import { Menu, Item, useContextMenu, Separator } from 'react-contexify';
import { Select } from '../../assets/Select';
import { Block } from '../../assets/Block';
import { Delete } from '../../assets/Delete';
import { useEffect, useState } from 'react';
import DeleteChatModal from '../deleteChatModal/deleteChatModal';
import 'react-contexify/ReactContexify.css';
import { setChats } from '../chat/chatSlice';

const CHAT_MENU_ID = 'chat_menu_id';

function Header() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user-threads")!));
  const { selectedUser } = useSelector(state => state.user);
  const { searchedUser } = useSelector(state => state.searchedUser);
  const {onlineUsers} = useSocket();
  const [isDeleteChatOpen, setIsDeleteChatOpen] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const { show } = useContextMenu({
    id: CHAT_MENU_ID
  });

  function displayMenu(e){
    show({
      event: e,
    });
  }

  const getChats = async () => {
    try {
       const res = await fetch('/api/message/chats');
       const data = await res.json();
       if(data.error) {
        console.log(data.message);
        return
       }
      dispatch(setChats(data))
    } catch (error) {
        console.log(error)
    }
  };

  const handleBlockUser = async () => {
    try {
      const res = await fetch(`/api/message/blockUser/${selectedUser.userId || searchedUser.searchedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
      });

      const data = await res.json();

      if(data.error) {
        console.log(data)
        return 
      }

      localStorage.setItem('user-threads', JSON.stringify(data.user));
      setCurrentUser(data.user)
      getChats();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const handleUnblockUser = async () => {
    try {
      const res = await fetch(`/api/message/unBlockUser/${selectedUser.userId || searchedUser.searchedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
      });

      const data = await res.json();
      if(data.error) {
        console.log(data.error)
        return
      }
      
      localStorage.setItem('user-threads', JSON.stringify(data.user));
      getChats()
      setCurrentUser(data.user)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return(
    <div className='header'>
      {selectedUser.userId !== currentUser?._id ? 
        (selectedUser.userId || searchedUser.searchedUser?._id) && 
          <>
            <div className='header_user'>
              {selectedUser.avatar || searchedUser.searchedUser?.avatar ?
                <img src={selectedUser.avatar || searchedUser.searchedUser?.avatar} className='header_avatar' />
              :
                <div className='header_noavatar'>{firstLetter(selectedUser.username || searchedUser.searchedUser?.name)}</div>}
              <div>
                <p className='header_username'>{selectedUser.username || searchedUser.searchedUser?.name}</p>
                <p className='header_status'>{selectedUser.userId ? onlineUsers.includes(selectedUser.userId) ? 'Online' : 'Offline' : 'Last seen recently'}</p>
              </div>
            </div>
            <div className='header_icons'>
              {currentUser.blockedUsers.includes(selectedUser.userId || searchedUser.searchedUser._id) && <button onClick={handleUnblockUser} className='unblock'>Unblock user</button>}
              {/* <Search /> */}
              <button onClick={displayMenu} className='more_btn'>
                <More />
              </button>
            </div>
          </>
      :
        <>
          <div className='header_user'>
            <div className='header_noavatar saved'><Saved isHeader={true} /></div>
            <p className='header_username'>Saved</p>
          </div>
          <div className='header_icons'>
            {/* <Search /> */}
            <button onClick={displayMenu} className='more_btn'>
              <More />
            </button>
          </div>
        </>
      }

      {isDeleteChatOpen && <DeleteChatModal setIsDeleteChatOpen={setIsDeleteChatOpen} />}

      <Menu id={CHAT_MENU_ID} className='chat_menu' animation='fade' >
        {selectedUser._id &&
          <Item className='chat_menu_item'>
            <Select />
            <p>Select messages</p>
          </Item>}
        {selectedUser.userId !== currentUser._id &&
          <Item onClick={handleBlockUser} className='chat_menu_item'>
            <Block />
            <p>Block user</p>
          </Item>}
        {(selectedUser._id && selectedUser.userId !== currentUser._id) &&
          <>
            <Separator />
            <Item onClick={() => setIsDeleteChatOpen(true)} className='chat_menu_delete'>
              <Delete />
              <p>Delete chat</p>
            </Item>
          </>}
      </Menu>
    </div>
  )
}

export default Header