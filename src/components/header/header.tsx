import './header.css';
// import Logout from '../logout';
import { useSelector } from 'react-redux';
import { firstLetter } from '../../helpers/firstLetter';

function Header() {
  const { selectedUser } = useSelector(state => state.user);
  return(
    <div className='header'>
      {selectedUser.userId && 
        <>
          <div className='header_user'>
            <div className='header_avatar'>{firstLetter(selectedUser.username)}</div>
            <div>
              <p className='header_username'>{selectedUser.username}</p>
              <p className='header_status'>Last seen 2 hours ago</p>
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