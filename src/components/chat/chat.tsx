import { useEffect, useRef, useState } from 'react'
import './chat.css'
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from '../chat/chatSlice';
import Message from '../message/message';
import MessageInput from '../messageInput/messageInput';
import { useSocket } from '../../../server/context/socketContext';

function Chat() {
    const currentUser = JSON.parse(localStorage.getItem("user-threads")!);
    const { selectedUser } = useSelector(state => state.user);
    const { chats } = useSelector(state => state.chat);
    const { searchedUser } = useSelector(state => state.searchedUser);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const messageRef = useRef(null);
    console.log(selectedUser)

    const scrollToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTo(0, 100000);
        }
    };

    const updateChats = (data) => {
        const updatedChats = chats.map(chat => {
            if (chat._id === data.chatId) {
                return {
                    ...chat,
                    updatedAt: new Date().toISOString(),
                    lastMessage: {
                        text: data.text,
                        sender: data.userId,
                        seen: data.seen
                    },
                };
            }
            return chat;
        });
        return updatedChats;
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket?.on('messagesSeen', ({ chatId }) => {
            dispatch(setChats(() => {
                const updatedChats = chats.map(chat => {
                    if(chat._id === selectedUser._id) {
                        return {
                            ...chat, 
                            lastMessage: {
                                ...chat.lastMessage,
                                seen: true
                            }
                        }
                    }
                    return chat
                })
                return updatedChats
            }))
        })
    }, [])

    useEffect(() => {
        socket.on('newMessage', (message) => {
            setMessages((m) => [...m, message]);
            dispatch(setChats(updateChats(message)));
            dispatch(sortChats())
        })

        return () => socket.off('newMessage');
    }, [socket, chats, selectedUser, dispatch]);

    useEffect(() => {
        const isMessageNotOwn = messages.length && messages[messages.length - 1].userId !== (currentUser.user || currentUser.newUser)._id;
        if(isMessageNotOwn) {
            socket.emit('markMessagesAsSeen', {
                chatId: selectedUser._id,
                userId: selectedUser.user
            })
        }

        socket.on('messagesSeen', ({ chatId }) => {
            if(selectedUser._id === chatId) {
                setMessages((prev: any) => {
                    const updatedMessages = prev.map((message: any) => {
                        if(!message.seen) {
                            return {
                                ...message, 
                                seen: true
                            }
                        }
                        return message
                    })
                    return updatedMessages
                })
            }
        })
    }, [socket, currentUser._id, selectedUser])

    useEffect(() => {
        if(selectedUser.userId) {
            const getMessages = async () => {
                try {
                    const res = await fetch(`/api/message/${selectedUser.userId}`);
                    const data = await res.json();
                    if(data.error) {
                        console.log(data.message);
                        return
                    }
                    setMessages(data.messages);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingMessages(false);
                }
            };
    
            getMessages();
        }
    }, [selectedUser.userId]);

    return (
        <div className="chat">
            <div className='chat_section'>
                {selectedUser.userId ?
                    loadingMessages ?
                        <p>Loading...</p>
                    :
                        <>
                            <MessageInput setMessages={setMessages} />
                            <div className='message_section' ref={messageRef}>  
                                {messages.map((message, index) => <Message message={message} key={index} />)}
                            </div>
                        </>
                :
                    searchedUser.searchedUser?._id ?
                        <MessageInput setMessages={setMessages} />
                    :
                        ''}
            </div>
        </div>
    )
}

export default Chat