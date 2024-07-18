import './user.css'
import { firstLetter } from '../../helpers/firstLetter'
import { changeTimeZone } from '../../helpers/changeTimeZone'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './toggleUser';

function User({ chat }) {
  const { selectedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  return(
    <div className={`user ${selectedUser._id === chat._id && 'active'}`} onClick={() => dispatch(selectUser({ selectedUser: {_id: chat._id, userId: chat.members[0]._id, username: chat.members[0].name} }))}>
      <div className='sideBar_user_avatar'>{chat.members[0].avatar ? chat.members[0].avatar : firstLetter(chat.members[0].name)}</div>
      <div className='user_text'>
        <p className='user_name'>{chat.members[0].name}</p>
        <p className='user_lastMessage'>{chat.lastMessage.text}</p>
      </div>
      <p className='user_lastMessage_time'>{changeTimeZone(chat.updatedAt)}</p>
    </div>
  )
}

export default User