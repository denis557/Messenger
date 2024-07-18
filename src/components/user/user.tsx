import './user.css'
import { firstLetter } from '../../helpers/firstLetter'
import { changeTimeZone } from '../../helpers/changeTimeZone'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './userSlice';
import { useSocket } from '../../../server/context/socketContext';

function User({ chat }) {
  const { socket, onlineUsers } = useSocket();
  const { selectedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  return(
    <div className={`user ${selectedUser._id === chat._id && 'active'}`} onClick={() => dispatch(selectUser({ selectedUser: {_id: chat._id, userId: chat.members[0]._id, username: chat.members[0].name} }))}>
      <div className='sideBar_user_avatar'>
        {chat.members[0].avatar ? chat.members[0].avatar : firstLetter(chat.members[0].name)}
        {onlineUsers.includes(chat.members[0]._id) && <div className='online'></div>}
      </div>
      <div className='user_text'>
        <p className='user_name'>{chat.members[0].name}</p>
        <p className='user_lastMessage'>{chat.lastMessage.text}</p>
      </div>
      <p className='user_lastMessage_time'>{changeTimeZone(chat.updatedAt)}</p>
    </div>
  )
}

export default User