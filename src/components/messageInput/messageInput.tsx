import './messageInput.css'
import Add from '../../assets/AddMessage'
import Send from '../../assets/Send'
import Emoji from '../../assets/Emoji'
import { Cancel } from '../../assets/Cancel'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from '../chat/chatSlice';
import { setPage } from '../sideBar/sideBarSlice';
import EmojiPicker from 'emoji-picker-react';
import { setSearchedUser } from '../searchedUser/searchedUserSlice';
import { setMessages } from '../message/messagesSlice';
import { setMode } from './modeSlice'
import usePreviewImg from '../../helpers/usePreviewImg'
import { RootState } from '../../App/store'

function MessageInput() {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const { messages } = useSelector((state: RootState) => state.messages)
    const [message, setMessage] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const { selectedUser } = useSelector((state: RootState) => state.user);
    const { searchedUser } = useSelector((state: RootState) => state.searchedUser);
    const { chats } = useSelector((state: RootState) => state.chat);
    const { mode } = useSelector((state: RootState) => state.mode);
    const dispatch = useDispatch();
    const repliedOrEditedMessage = mode.messageId ? messages.find(message => message._id === mode.messageId) : ''
    console.log(mode)

    const { handleImgChange, imgUrl, setImgUrl } = usePreviewImg();

    const editMessage = () => {
        const updatedMessages = messages.map(messageEl => {
            if(messageEl._id === mode.messageId) {
                return {
                    ...messageEl,
                    text: message,
                    isEdited: true
                }
            }
            return messageEl
        })
        return updatedMessages
    }

    const updateChats = (data) => {
        const updatedChats = chats.map(chat => {
            if(chat._id === selectedUser._id) {
                return {
                    ...chat,
                    updatedAt: new Date().toISOString(),
                    lastMessage: {
                        text: message,
                        sender: (data.newMessage || data.message).userId
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
                    recipientId: selectedUser.userId || searchedUser.searchedUser?._id,
                    file: imgUrl,
                    repliedMessageId: mode.messageId || ''
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
            dispatch(setMode({ mode: { mode: 'default', messageId: '' }}));
            getChats();
            dispatch(setSearchedUser({ searchedUser: { _id: '', name: '', avatar: '' } }));
            setMessage('');
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditMessage = async (e) => {
        e.preventDefault();
        if(!message) return
        try {
            const res = await fetch(`api/message/editMessage/${mode.messageId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    updatedText: message,
                    recipientId: selectedUser.userId || searchedUser.searchedUser?._id,
                })
            });

            const data = await res.json();

            if(data.error) {
                console.log(data);
                return
            }

            dispatch(setMessages(editMessage()))
            dispatch(setChats(updateChats(data)));
            dispatch(setMode({ mode: { mode: 'default', messageId: '' }}));
            setMessage('');
        } catch (error) {
             console.error(error)
        }
    }

    useEffect(() => {
        if(imgUrl) dispatch(setMode({ mode: { mode: 'img', messageId: '' } }))
    }, [imgUrl])

    return (
        <>
            <form className='input_section' onSubmit={mode.mode === 'edit' ? handleEditMessage : handleSendMessage}>
                <input type='file' id='file_message_input' onChange={handleImgChange} />
                <label htmlFor='file_message_input'><Add /></label>
                <div className='input_div'>
                    <>
                        {mode.mode === 'edit' && 
                            <div className='mode_div'>
                                <hr />
                                <div>
                                    <p className='mode_title'>Edit message</p>
                                    <p className='mode_text'>{repliedOrEditedMessage?.text}</p>
                                </div>
                                <button onClick={() => dispatch(setMode({ mode: { mode: 'default', messageId: '' } }))}><Cancel /></button>
                            </div>
                        }
                        {mode.mode === 'reply' &&
                            <div className='mode_div'>
                                <hr />
                                <div>
                                    <p className='mode_title'>{currentUser._id === repliedOrEditedMessage?.userId ? "You" : selectedUser.username}</p>
                                    <p className='mode_text'>{repliedOrEditedMessage?.text}</p>
                                </div>
                                <button onClick={() => dispatch(setMode({ mode: { mode: 'default', messageId: '' } }))}><Cancel /></button>
                            </div>
                        }
                        {mode.mode === 'img' && 
                            <div className='mode_div'>
                                <hr />
                                <div>
                                    <img src={imgUrl} className='message_input_img' />
                                </div>
                                <button onClick={() => {dispatch(setMode({ mode: { mode: 'default', messageId: '' } })); setImgUrl(null)}}><Cancel /></button>
                            </div>
                        }
                        <div className='default_input_div'>
                            <input type='text' className='message_input' placeholder='Enter a message' value={message} onChange={e => setMessage(e.target.value)} />
                            <button type='button' className='emoji_btn' onClick={() => setIsShowEmoji(true)}><Emoji /></button>
                        </div>
                    </>
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