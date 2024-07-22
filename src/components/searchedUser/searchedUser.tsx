import { firstLetter } from "../../helpers/firstLetter";

function SearchedUser({ user }) {
    return (
        <div className='user'>
            <div className='sideBar_user_avatar'>
                {firstLetter(user.name)}
            </div>
            <div className='user_text'>
                <p className='user_name'>{user.name}</p>
                <p className='user_lastMessage'>@{user.username}</p>
            </div>
        </div>
    )
}

export default SearchedUser