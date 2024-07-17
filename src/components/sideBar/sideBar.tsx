import './sideBar.css';
import User from '../user/user';

function SideBar({ loadingChats, chats }) {
  return(
    <div className='sideBar'>
      <div className='sideBar_header'>
        <svg className='menu_btn' width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/> <path d="M2 15H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/> <path d="M2 28H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/></svg>
        <input className='sideBar_search' />
      </div>
      <div className='sideBar_main'>
        {loadingChats ?
          <p>Loading...</p>
        :
          <>
            {chats.map((chat, index) => <User chat={chat} key={index} />)}
          </>}
      </div>
    </div>
  )
}

export default SideBar