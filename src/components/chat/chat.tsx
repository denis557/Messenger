import { useEffect, useState } from 'react'
import './chat.css'
import { useDispatch, useSelector } from 'react-redux';
import { setChats, sortChats } from '../chat/chatSlice';
import Message from '../message/message';
import MessageInput from '../messageInput/messageInput';
import { useSocket } from '../../../server/context/socketContext';

function Chat() {
    const { selectedUser } = useSelector(state => state.user);
    const { chats } = useSelector(state => state.chat)
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const { socket } = useSocket();
    const dispatch = useDispatch();

    const updateChats = (data) => {
        const updatedChats = chats.map(chat => {
            if (chat._id === data.chatId) {
                return {
                    ...chat,
                    lastMessage: {
                        text: data.text,
                        sender: data.userId,
                    },
                };
            }
            return chat;
        });
        return updatedChats;
    };

    useEffect(() => {
        socket.on('newMessage', (message) => {
            setMessages((m) => [...m, message]);
            dispatch(setChats(updateChats(message)));
            dispatch(sortChats)
        })

        return () => socket.off('newMessage');
    }, [socket, chats, selectedUser, dispatch])

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
    }, [selectedUser.userId])

    return(
        <div className="chat">
            <div className='chat_section'>
                {selectedUser.userId ?
                    loadingMessages ?
                        <p>Loading...</p>
                    :
                        <>
                            <MessageInput setMessages={setMessages} />
                            <div className='message_section'>  
                                {messages.map((message, index) => <Message message={message} key={index} />)}
                            </div>
                        </>
                :
                <></>}
            </div>
        </div>
    )
}

export default Chat