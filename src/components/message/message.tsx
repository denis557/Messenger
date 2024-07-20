import './message.css'
import { changeTimeZone } from '../../helpers/changeTimeZone';
import Seen from '../../assets/Seen'
import Unseen from '../../assets/Unseen'

function Message({ message }) {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    return(
        <div className={`message ${(currentUser.user || currentUser.newUser)._id === message.userId && 'own'}`}>
            <p className='message_text'>{message.text}</p>
            <div className='message_info_div'>
                {(currentUser.user || currentUser.newUser)._id === message.userId ? message.seen ? <Seen /> : <Unseen /> : ''}
                <p className='message_time'>{changeTimeZone(message.updatedAt)}</p>
            </div>
        </div>
    )
}

export default Message