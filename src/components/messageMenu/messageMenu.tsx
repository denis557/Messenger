import './messageMenu.css'
import { Menu, Item } from 'react-contexify';
import 'react-contexify/ReactContexify.css'
import { useDispatch } from 'react-redux';
import { setChats } from '../chat/chatSlice';
import { Reply } from '../../assets/Reply';
import { Edit } from '../../assets/Edit';
import { Copy } from '../../assets/Copy';
import { Select } from '../../assets/Select';
import { Delete } from '../../assets/Delete';

const MESSAGE_MENU_ID = 'message_menu_id';

function MessageMenu() {
    const dispatch = useDispatch();

    // const handleItemClick = ({ event, props, triggerEvent, data }) => {
    //     console.log(event, props, triggerEvent, data);
    // };

    return(
        <Menu id={MESSAGE_MENU_ID} animation='fade' className='message_menu'>
            <Item className='message_menu_item'>
                <Reply />
                <p>Reply</p>
            </Item>
            <Item hidden={({props}) => !props.isOwnMessage} className='message_menu_item'>
                <Edit />
                <p>Edit</p>
            </Item>
            <Item className='message_menu_item'>
                <Copy />
                <p>Copy text</p>
            </Item>
            <Item className='message_menu_item'>
                <Select />
                <p>Select</p>
            </Item>
            <Item className='message_menu_delete'>
                <Delete />
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