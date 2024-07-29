import './messageInput.css'
import Add from '../../assets/AddMessage'
import Send from '../../assets/Send'
import Emoji from '../../assets/Emoji'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from '../chat/chatSlice';
import { setPage } from '../sideBar/sideBarSlice';
import EmojiPicker from 'emoji-picker-react';
import { setSearchedUser } from '../searchedUser/searchedUserSlice';
import { setMessages } from '../message/messagesSlice';

function MessageInput() {
    const { messages } = useSelector((state: RootState) => state.messages)
    const [message, setMessage] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const { selectedUser } = useSelector(state => state.user);
    const { searchedUser } = useSelector(state => state.searchedUser);
    const { chats } = useSelector(state => state.chat);
    const { mode } = useSelector(state => state.mode);
    const dispatch = useDispatch();

    console.log(mode)

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
            dispatch(setMessages([...messages, data.newMessage]))
            dispatch(setChats(updateChats(data)));
            dispatch(sortChats());
            dispatch(setPage({page: 'main'}));
            getChats();
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
                    {mode === 'default' ? 
                        <div className='default_input_div'>
                            <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                            <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button>
                        </div>
                    :
                        mode === 'edit' ?
                            <>
                                <div className='mode_div'>
                                    <hr />
                                    <div>
                                        <p className='mode_title'>David</p>
                                        <p className='mode_text'>Hello!</p>
                                    </div>
                                </div>
                                <div className='default_input_div'>
                                    <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                                    <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button>
                                </div>
                            </>
                        :
                            mode === 'reply' ?
                                <>
                                    <div className='mode_div'>
                                        <hr />
                                        <div>
                                            <p className='mode_title'>Edit message</p>
                                            <p className='mode_text'>Hello my friend</p>
                                        </div>
                                    </div>
                                    <div className='default_input_div'>
                                        <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                                        <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button>
                                    </div>
                                </>
                            :
                                ''
                    }
{/* 
                    <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                    <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button> */}
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