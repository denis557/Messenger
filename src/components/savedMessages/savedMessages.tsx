import './savedMessages.css'
import { changeTimeZone } from '../../helpers/changeTimeZone'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice';
import { setSearchedUser } from "../chat/searchedUserSlice";
import { Saved } from '../../assets/Saved';

function SavedMessages({ chat }) {
  const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
  const { selectedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <div className={`user ${selectedUser._id === chat._id && 'active'}`} onClick={() => {
      dispatch(selectUser({ selectedUser: {_id: chat._id, userId: currentUser?.user?._id, username: 'Saved'} }));
      dispatch(setSearchedUser({ searchedUser: { _id: '', name: '', avatar: '' } }))
    }}>
    <div className='sideBar_saved_avatar'>
        <Saved />
    </div>
      <div className='user_text'>
        <p className='saved_name'>Saved</p>
        {chat.lastMessage.text && <p className='user_lastMessage'>{chat.lastMessage.text}</p>}
      </div>
      <div className='user_lastMessage_info_div'>
        <p className='user_lastMessage_time'>{changeTimeZone(chat.updatedAt)}</p>
      </div>
    </div>
  )
}

export default SavedMessages