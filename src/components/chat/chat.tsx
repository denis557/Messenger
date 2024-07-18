import { useEffect, useState } from 'react'
import './chat.css'
import { useSelector } from 'react-redux';
import Message from '../message/message';
import MessageInput from '../messageInput/messageInput';

function Chat() {
    const { selectedUser } = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);

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