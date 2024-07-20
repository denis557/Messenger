import './message.css'
import { changeTimeZone } from '../../helpers/changeTimeZone';
import Unseen from '../../assets/Unseen'
import Seen from '../../assets/Seen'

function Message({ message }) {
    console.log(message.seen)
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    return(
        <div className={`message ${(currentUser.user || currentUser.newUser)._id === message.userId && 'own'}`}>
            <p className='message_text'>{message.text}</p>
            {message.seen ? <Unseen /> : <Unseen />}
            <p className='message_time'>{changeTimeZone(message.updatedAt)}</p>
        </div>
    )
}

export default Message