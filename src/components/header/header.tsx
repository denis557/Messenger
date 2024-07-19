import './header.css';
// import Logout from '../logout';
import { useSelector } from 'react-redux';
import { firstLetter } from '../../helpers/firstLetter';
import { useSocket } from '../../../server/context/socketContext';

function Header() {
  const { selectedUser } = useSelector(state => state.user);
  const {onlineUsers} = useSocket();
  return(
    <div className='header'>
      {selectedUser.userId && 
        <>
          <div className='header_user'>
            <div className='header_avatar'>{firstLetter(selectedUser.username)}</div>
            <div>
              <p className='header_username'>{selectedUser.username}</p>
              <p className='header_status'>{onlineUsers.includes(selectedUser.userId) ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className='header_icons'>
            
          </div>
        </>
      }
    </div>
  )
}

export default Header