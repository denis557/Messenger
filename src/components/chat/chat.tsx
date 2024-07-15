import { useEffect } from 'react'
import './chat.css'

function Chat() {
    useEffect(() => {
        const getChats = async () => {
            try {
               const res = await fetch('/api/message/chats');
               const data = await res.json();
               if(data.error) {
                console.log(data.message);
                return
               };
               console.log(data)
            } catch (error) {
                console.log(error)
            }
        };

        getChats();
    }, [])

    return(
        <div className="chat">
            
        </div>
    )
}

export default Chat