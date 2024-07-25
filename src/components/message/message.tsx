import './message.css'
import { changeTimeZone } from '../../helpers/changeTimeZone';
import Seen from '../../assets/Seen'
import Unseen from '../../assets/Unseen'
import { useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css'

const MESSAGE_MENU_ID = 'message_menu_id';

function Message({ message }) {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const { show } = useContextMenu({
        id: MESSAGE_MENU_ID
    });

    const displayMenu = (e) => {
        e.preventDefault();
        show({
            event: e,
            props: { message, isOwnMessage }
        });
    };

    const isOwnMessage = currentUser._id === message.userId;
    return(
        <div className={`message ${isOwnMessage && 'own'}`} onContextMenu={displayMenu}>
            <p className='message_text'>{message.text}</p>
            <div className='message_info_div'>
                {isOwnMessage ? message.seen ? <Seen /> : <Unseen /> : ''}
                <p className='message_time'>{changeTimeZone(message.updatedAt)}</p>
            </div>
        </div>
    )
}

export default Message