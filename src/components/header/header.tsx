import './header.css';
// import Logout from '../logout';
import { useSelector } from 'react-redux';
import { firstLetter } from '../../helpers/firstLetter';
import { useSocket } from '../../../server/context/socketContext';

function Header() {
  const { selectedUser } = useSelector(state => state.user);
  const { searchedUser } = useSelector(state => state.searchedUser);
  const {onlineUsers} = useSocket();
  return(
    <div className='header'>
      {(selectedUser.userId || searchedUser.searchedUser?._id) && 
        <>
          <div className='header_user'>
            <div className='header_avatar'>{firstLetter(selectedUser.username || searchedUser.searchedUser?.name)}</div>
            <div>
              <p className='header_username'>{selectedUser.username || searchedUser.searchedUser?.name}</p>
              <p className='header_status'>{selectedUser.userId ? onlineUsers.includes(selectedUser.userId) ? 'Online' : 'Offline' : 'Last seen recently'}</p>
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