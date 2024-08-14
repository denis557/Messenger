import './message.css'
import { changeTimeZone } from '../../helpers/changeTimeZone';
import Seen from '../../assets/Seen'
import Unseen from '../../assets/Unseen'
import { useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css'
import { useSelector } from 'react-redux';

const MESSAGE_MENU_ID = 'message_menu_id';

function Message({ message }) {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const { messages } = useSelector((state: RootState) => state.messages)
    const { selectedUser } = useSelector(state => state.user);
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
    const repliedMessage = message.reply ? messages.find(messageEl => messageEl._id === message.reply) : ''
    return(
        <>
            {message.reply ? 
                <div className={`message ${isOwnMessage && 'own'}`} onContextMenu={displayMenu}>
                    <div className='message_reply'>
                        <hr />
                        <div>
                            <p className='mode_title'>{repliedMessage ? currentUser._id === repliedMessage.userId ? "You" : selectedUser.username : 'Deleted'}</p>
                            <p className='mode_text'>{repliedMessage ? repliedMessage.text : "Deleted"}</p>
                        </div>
                    </div>
                    {message.file && <img src={message.file} className='messsage_img' />}
                    <div className='message_wraper'>
                        <p className='message_text'>{message.text}</p>
                        <div className='message_info_div'>
                            {message.isEdited && <p className='edited'>edited</p>}
                            {isOwnMessage ? message.seen ? <Seen /> : <Unseen /> : ''}
                            <p className='message_time'>{changeTimeZone(message.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            :
                <div className={`message ${isOwnMessage && 'own'}`} onContextMenu={displayMenu}>
                    {message.file && <img src={message.file} className='messsage_img' />}
                    <div className='message_wraper'>
                        <p className='message_text'>{message.text}</p>
                        <div className='message_info_div'>
                            {message.isEdited && <p className='edited'>edited</p>}
                            {isOwnMessage ? message.seen ? <Seen /> : <Unseen /> : ''}
                            <p className='message_time'>{changeTimeZone(message.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            }
        </>
        // </div>
    )
}

export default Message