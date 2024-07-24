import './messageMenu.css'
import { Menu, Item } from 'react-contexify';
import 'react-contexify/ReactContexify.css'
import { useDispatch } from 'react-redux';
import { setChats } from '../chat/chatSlice';

const MESSAGE_MENU_ID = 'message_menu_id';

function MessageMenu() {
    const dispatch = useDispatch();

    const handleItemClick = ({ event, props, triggerEvent, data }) => {
        console.log(event, props, triggerEvent, data);
    };

    return(
        <Menu id={MESSAGE_MENU_ID} animation='fade' className='message_menu'>
            <Item onClick={handleItemClick} className='message_menu_item'>
                <p>Reply</p>
            </Item>
            <Item hidden={({props}) => !props.isOwnMessage} onClick={handleItemClick} className='message_menu_item'>
                <p>Edit</p>
            </Item>
            <Item onClick={handleItemClick} className='message_menu_item'>
                <p>Copy text</p>
            </Item>
            <Item onClick={handleItemClick} className='message_menu_item'>
                <p>Select</p>
            </Item>
            <Item onClick={handleItemClick} className='message_menu_item'>
                <p>Delete</p>
            </Item>
            {/* <div onClick={handleItemClick}>
                <p>Reply</p>
            </div>
            <div onClick={handleItemClick}>
                <p>Edit</p>
            </div>
            <div onClick={handleItemClick}>
                <p>Copy text</p>
            </div>
            <div onClick={handleItemClick}>
                <p>Select</p>
            </div>
            <div onClick={handleItemClick}>
                <p>Delete</p>
            </div> */}
        </Menu>
    )
}

export default MessageMenu