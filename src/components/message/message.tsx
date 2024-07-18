import './message.css'
import { changeTimeZone } from '../../helpers/changeTimeZone';

function Message({ message }) {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    return(
        <div className={`message ${currentUser.user._id === message.userId && 'own'}`}>
            <p className='message_text'>{message.text}</p>
            <p className='message_time'>{changeTimeZone(message.updatedAt)}</p>
        </div>
    )
}

export default Message