import './user.css'
import { firstLetter } from '../../helpers/firstLetter'
import { changeTimeZone } from '../../helpers/changeTimeZone'

function User({ chat }) {
  return(
    <div className='user'>
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