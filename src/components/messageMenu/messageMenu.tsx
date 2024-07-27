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

function MessageMenu({ message }) {
    const dispatch = useDispatch();

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
        </Menu>
    )
}

export default MessageMenu