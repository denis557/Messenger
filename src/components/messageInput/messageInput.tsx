import './messageInput.css'
import Add from '../../assets/AddMessage'
import Send from '../../assets/Send'
import Emoji from '../../assets/Emoji'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function MessageInput({ setMessages }) {
    const [message, setMessage] = useState('');
    const { selectedUser } = useSelector(state => state.user);

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
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <form className='input_section' onSubmit={handleSendMessage}>
            <div className='input_btn'><Add /></div>
            <div className='input_div'>
                <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                <button type='button' className='emoji_btn'><Emoji /></button>
            </div>
            <button type='submit' className='input_btn'><Send /></button>
        </form>
    )
}

export default MessageInput