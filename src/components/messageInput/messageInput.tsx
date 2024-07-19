import './messageInput.css'
import Add from '../../assets/AddMessage'
import Send from '../../assets/Send'
import Emoji from '../../assets/Emoji'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from '../chat/chatSlice';
import EmojiPicker from 'emoji-picker-react';

function MessageInput({ setMessages }) {
    const [message, setMessage] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const { selectedUser } = useSelector(state => state.user);
    const { chats } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    const updateChats = (data) => {
        const updatedChats = chats.map(chat => {
            if(chat._id === selectedUser._id) {
                return {
                    ...chat,
                    updatedAt: new Date().toISOString(),
                    lastMessage: {
                        text: message,
                        sender: data.newMessage.userId
                    }
                }
            }
            return chat
        });
        return updatedChats
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(!message) return;
        try {
            const res = await fetch('api/message/sendMessage', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    recipientId: selectedUser.userId
                })
            });
            const data = await res.json();
            if(data.error) {
                console.log(data)
                return
            }
            setMessages((messages) => [...messages, data.newMessage]);
            dispatch(setChats(updateChats(data)));
            dispatch(sortChats());
            setMessage('');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <EmojiPicker theme='dark' emojiStyle='apple' open={isShowEmoji} className='emoji_picker' onEmojiClick={(emoji) => {setMessage(m => m + emoji.emoji), setIsShowEmoji(false)}} />
            <form className='input_section' onSubmit={handleSendMessage}>
                <input type='file' id='file_message_input' />
                <label htmlFor='file_message_input'><Add /></label>
                <div className='input_div'>
                    <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                    <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button>
                </div>
                <button type='submit' className='input_btn'><Send /></button>
            </form>
        </>
    )
}

export default MessageInput