import './messageInput.css'
import Add from '../../assets/AddMessage'
import Send from '../../assets/Send'
import Emoji from '../../assets/Emoji'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from '../chat/chatSlice';
import { setPage } from '../sideBar/sideBarSlice';
import EmojiPicker from 'emoji-picker-react';
import { setSearchedUser } from '../chat/searchedUserSlice';
import { selectUser } from '../user/userSlice';

function MessageInput({ setMessages }) {
    const [message, setMessage] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const { selectedUser } = useSelector(state => state.user);
    const { searchedUser } = useSelector(state => state.searchedUser);
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

    const getChats = async () => {
        try {
           const res = await fetch('/api/message/chats');
           const data = await res.json();
           if(data.error) {
            console.log(data.message);
            return
           }
          dispatch(setChats(data))
        } catch (error) {
            console.log(error)
        } finally {
          dispatch(sortChats());
        }
    };

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
                    recipientId: selectedUser.userId || searchedUser.searchedUser?._id
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
            dispatch(setPage({page: 'main'}));
            await getChats();
            const selectedChat = searchedUser.searchedUser?._id ? chats.find(chat => chat.members[0]?._id === searchedUser.searchedUser?._id) : '';
            searchedUser.searchedUser?._id && dispatch(selectUser({ selectedUser: {_id: selectedChat?._id, userId: selectedChat?.members[0]._id, username: selectedChat?.members[0].name, avatar: selectedChat?.members[0].avatar } }));
            dispatch(setSearchedUser({ searchedUser: { _id: '', name: '', avatar: '' } }));
            setMessage('');
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <form className='input_section' onSubmit={handleSendMessage}>
                <input type='file' id='file_message_input' />
                <label htmlFor='file_message_input'><Add /></label>
                <div className='input_div'>
                    <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                    <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button>
                </div>
                <button type='submit' className='input_btn'><Send /></button>
            </form>
            <div className='emoji_div'>
                <EmojiPicker theme='dark' emojiStyle='apple' open={isShowEmoji} className='emoji_picker' onEmojiClick={(emoji) => {setMessage(m => m + emoji.emoji), setIsShowEmoji(false)}} />
            </div>
        </>
    )
}

export default MessageInput