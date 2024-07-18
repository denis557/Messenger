import { useEffect, useState } from 'react'
import './chat.css'
import { useSelector } from 'react-redux';

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
            {selectedUser._id &&
                loadingMessages ? <p>Loading...</p> : messages.map((message, index) => <p key={index}>{message.text}</p>)
            }
        </div>
    )
}

export default Chat