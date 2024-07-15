import './user.css'

function User({ chats }) {
  return(
    <div className='user'>
      <div className='sideBar_user_avatar'>D</div>
      <div className='user_text'>
        <p className='user_name'>David</p>
        <p className='user_lastMessage'>Hello my friend!</p>
      </div>
      <p className='user_lastMessage_time'>9:27 PM</p>
    </div>
  )
}

export default User