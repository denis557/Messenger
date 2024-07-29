import './chat.css'
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../../server/context/socketContext';
import { RootState } from '../../App/store';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from './chatSlice';
import MessageInput from '../messageInput/messageInput';
import MessageMenu from '../messageMenu/messageMenu';
import Message from '../message/message';
import { selectUser } from '../user/userSlice';
import { setMessages } from '../message/messagesSlice';

function Chat() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user-threads")!));
    const { messages } = useSelector((state: RootState) => state.messages)
    const [loadingMessages, setLoadingMessages] = useState(true);
    const { chats } = useSelector((state: RootState) => state.chat);
    const { selectedUser } = useSelector((state: RootState) => state.user);
    const { searchedUser } = useSelector((state: RootState) => state.searchedUser);
    const { socket } = useSocket();
    const dispatch = useDispatch();

    const messageRef = useRef(null);

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
                    unreadCount: (chat._id === data.chatId && data.userId !== currentUser._id) ? (chat.unreadCount || 0) + 1 : chat.unreadCount
                };
            }
            return chat;
        });
        return updatedChats;
    };

    const resetUnreadCount = () => {
        const updatedChats = chats.map(chat => {
            if(chat._id === selectedUser._id) {
                return {
                    ...chat,
                    unreadCount: 0
                };
            }
            return chat
        });
        return updatedChats
    }

    const updateMessages = () => {
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

    const getMessages = async () => {
        try {
            const res = await fetch(`/api/message/${selectedUser.userId}`);
            const data = await res.json();
            if(data.error) {
                console.log(data.message);
                return
            }
            dispatch(setMessages(data.messages));
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingMessages(false);
        }
    };

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user-threads")!))
    }, [localStorage.getItem('user-threads')])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on('deletedChat', (otherUserId) => {
            if(otherUserId === selectedUser.userId) {
                dispatch(selectUser({ selectedUser: { _id: '', userId: '', username: '', avatar: '' } }));
            }
            getChats();
        })

        return () => socket.off('deletedChat')
    }, [socket])

    useEffect(() => {
        socket.on('deletedMessage', (otherUserId) => {
            if(otherUserId === selectedUser.userId) {
                getMessages();
            }
        })

        return () => socket.off('deletedMessage')
    }, [socket])


    useEffect(() => {
        socket.on('blocked', (updatedUser) => {
          localStorage.setItem('user-threads', JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
        })
    
        return () => socket.off('blocked')
    }, [socket, selectedUser])

    useEffect(() => {
        socket.on('unblocked', (updatedUser) => {
          localStorage.setItem('user-threads', JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
        })
    
        return () => socket.off('unblocked')
    }, [socket, selectedUser])

    useEffect(() => {
        socket.on('newMessage', (message, newChat) => {
            dispatch(setChats(updateChats(message)));
            if(selectedUser.userId === message.userId) {
                dispatch(setMessages([...messages, message]))
            }

            if(!chats.some(chat => chat._id === newChat._id)) {
                getChats();
            }

            dispatch(sortChats());
        })

        return () => socket.off('newMessage');
    }, [socket, chats, selectedUser, dispatch]);

    useEffect(() => {
        const isLastMessageFromOtherUser = messages.length && messages[messages.length - 1]?.userId !== currentUser._id;
        if(isLastMessageFromOtherUser) {
            socket.emit('markMessagesAsSeen', {
                chatId: selectedUser._id,
                userId: selectedUser.userId
            });
            dispatch(setChats(resetUnreadCount()))
        }

        socket.on('messagesSeen', ({ chatId }) => {
            dispatch(setChats(updateMessages()))
            if(selectedUser._id === chatId) {
                const updatedMessages = messages.map((message) => {
                    if (!message.seen) {
                        return {
                            ...message,
                            seen: true
                        };
                    }
                    return message;
                });
                dispatch(setMessages(updatedMessages));
            }
        })
    }, [socket, currentUser._id, selectedUser, messages])

    useEffect(() => {
        if(selectedUser.userId) {
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
                            {currentUser.blockedUsers.includes(selectedUser.userId) ? 
                                ''
                            : 
                                currentUser.blockedBy.includes(selectedUser.userId) ?
                                    <div className='blocked'>
                                        <p>You are blocked by this user!</p>
                                    </div>
                                :
                                    <MessageInput />
                            }
                            <div className='message_section' ref={messageRef}>  
                                {messages.map((message, index) => <Message message={message} key={index} />)}
                            </div>
                        </>
                :
                    searchedUser.searchedUser?._id ?
                        currentUser.blockedUsers.includes(searchedUser.searchedUser?._id) ? 
                            ''
                        : 
                            currentUser.blockedBy.includes(searchedUser.searchedUser?._id) ?
                                <div className='blocked'>
                                    <p>You are blocked by this user!</p>
                                </div>
                            :
                                <MessageInput />
                        
                    :
                        ''}
            </div>
            <MessageMenu />
        </div>
    )
}

export default Chat