import './user.css'
import { firstLetter } from '../../helpers/firstLetter'
import { changeTimeZone } from '../../helpers/changeTimeZone'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './userSlice';
import { setSearchedUser } from "../searchedUser/searchedUserSlice";
import { useSocket } from '../../../server/context/socketContext';
import Seen from '../../assets/Seen'
import Unseen from '../../assets/Unseen'

function User({ chat }) {
  const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
  const { socket, onlineUsers } = useSocket();
  const { selectedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  // console.log(chat)

  return (
    <div className={`user ${selectedUser._id === chat._id && 'active'}`} onClick={() => {
      dispatch(selectUser({ selectedUser: {_id: chat._id, userId: chat.members[0]._id, username: chat.members[0].name, avatar: chat.members[0].avatar} }));
      dispatch(setSearchedUser({ searchedUser: { _id: '', name: '', avatar: '' } }))
    }}>
      {onlineUsers.includes(chat.members[0]._id) ? 
        <div className='siseBar_user_avatar_border'>
          {chat.members[0].avatar ?
           <img src={chat.members[0].avatar} className='sideBar_user_avatar' />
          :
            <div className='sideBar_user_noavatar'>
              {firstLetter(chat.members[0].name)}
            </div>
          }
        </div>
      :
        <>
        {chat.members[0].avatar ?
          <img src={chat.members[0].avatar} className='sideBar_user_avatar' />
         :
          <div className='sideBar_user_noavatar'>
            {firstLetter(chat.members[0].name)}
          </div>
        }
        </>
      }
      <div className='user_text'>
        <p className='user_name'>{chat.members[0].name}</p>
        <p className='user_lastMessage'>{chat.lastMessage.text}</p>
      </div>
      <div className='user_lastMessage_info_wrapper'>
        <div className='user_lastMessage_info_div'>
          {currentUser._id === chat.lastMessage.sender ? chat.lastMessage.seen ? <Seen /> : <Unseen /> : ''}
          <p className='user_lastMessage_time'>{changeTimeZone(chat.updatedAt)}</p>
        </div>
        {(chat.unreadCount !== 0 && chat.lastMessage.sender !== currentUser._id) ? <div className='unread_count'>{chat.unreadCount}</div> : ''}
      </div>
    </div>
  )
}

export default User