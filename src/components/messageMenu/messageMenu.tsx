import './messageMenu.css'
import { Menu, Item } from 'react-contexify';
import 'react-contexify/ReactContexify.css'
import { useDispatch } from 'react-redux';
import { Reply } from '../../assets/Reply';
import { Edit } from '../../assets/Edit';
import { Copy } from '../../assets/Copy';
import { Select } from '../../assets/Select';
import { Delete } from '../../assets/Delete';
import DeleteMessageModal from '../deleteMessageModal/deleteMessageModal';
import { useState } from 'react';
import { setMode } from '../messageInput/modeSlice';

const MESSAGE_MENU_ID = 'message_menu_id';

function MessageMenu() {
    const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null);
    const dispatch = useDispatch();

    function copy (text: string) {
        navigator.clipboard.writeText(text)
    }

    return(
        <>
            <Menu id={MESSAGE_MENU_ID} animation='fade' className='message_menu'>
                <Item className='message_menu_item' onClick={({props}) => dispatch(setMode({ mode: { mode: 'reply', messageId: props.message._id } }))}>
                    <Reply />
                    <p>Reply</p>
                </Item>
                <Item hidden={({props}) => !props.isOwnMessage} className='message_menu_item' onClick={({props}) => dispatch(setMode({ mode: { mode: 'edit', messageId: props.message._id } }))}>
                    <Edit />
                    <p>Edit</p>
                </Item>
                <Item className='message_menu_item' onClick={({props}) => copy(props.message.text)}>
                    <Copy />
                    <p>Copy text</p>
                </Item>
                <Item className='message_menu_item'>
                    <Select />
                    <p>Select</p>
                </Item>
                <Item className='message_menu_delete' onClick={({props}) => {setIsDeleteMessageOpen(true); setSelectedMessage(props.message)}}>
                    <Delete />
                    <p>Delete</p>
                </Item>
            </Menu>
            {isDeleteMessageOpen && <DeleteMessageModal setIsDeleteMessageOpen={setIsDeleteMessageOpen} message={selectedMessage} />}
        </>
    )
}

export default MessageMenu