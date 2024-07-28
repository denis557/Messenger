import { useDispatch, useSelector } from "react-redux";
import { firstLetter } from "../../helpers/firstLetter";
import { selectUser } from '../user/userSlice';
import { setSearchedUser } from "./searchedUserSlice";

function SearchedUser({ user }) {
    const dispatch = useDispatch();
    const { searchedUser } = useSelector(state => state.searchedUser);
    const { selectedUser } = useSelector(state => state.user);

    return (
        <div className={`user ${searchedUser.searchedUser?._id === user._id ? 'active' : ''}`} onClick={() => {
            dispatch(setSearchedUser({ searchedUser: { _id: user._id, name: user.name, avatar: user.avatar } }));
            dispatch(selectUser({ selectedUser: { _id: '', userId: '', username: '', avatar: '' } }));
            }}>
            {user.avatar ?
                <img src={user.avatar} className='sideBar_user_avatar' />
            :
                <div className='sideBar_user_noavatar'>
                    {firstLetter(user.name)}
                </div>
            }
            <div className='user_text'>
                <p className='user_name'>{user.name}</p>
                <p className='user_lastMessage'>@{user.username}</p>
            </div>
        </div>
    )
}

export default SearchedUser