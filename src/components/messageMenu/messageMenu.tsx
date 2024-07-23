import './messageMenu.css'
import { Menu } from 'react-contexify';
import 'react-contexify/ReactContexify.css'

const MESSAGE_MENU_ID = 'message_menu_id';

function MessageMenu() {
    const handleItemClick = ({ event, props, triggerEvent, data }) => {
        console.log(event, props, triggerEvent, data);
    };

    return(
        <Menu id={MESSAGE_MENU_ID} animation='fade' className='message_menu'>
            {/* <Item onClick={handleItemClick}>
                <p>Option 1</p>
            </Item>
            <Item onClick={handleItemClick}>
                <p>Option 2</p>
            </Item>
            <Item onClick={handleItemClick}>
                <p>Option 3</p>
            </Item> */}
            <div onClick={handleItemClick}>
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
            </div>
        </Menu>
    )
}

export default MessageMenu