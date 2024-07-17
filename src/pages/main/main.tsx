import './main.css'
import SideBar from "../../components/sideBar/sideBar"
import Header from "../../components/header/header"
import Chat from '../../components/chat/chat';
import { useEffect, useState } from 'react';

function Main() {
  const [loadingChats, setLoadingChats] = useState(true);
  const [chats, setChats] = useState(null);
  // const [selectedChat, setSelectedChat] = useState({
  //   _id: '',
  //   userId: '',
  //   username: ''
  // })

  useEffect(() => {
    const getChats = async () => {
        try {
           const res = await fetch('/api/message/chats');
           const data = await res.json();
           if(data.error) {
            console.log(data.message);
            return
           }
           setChats(data);
        } catch (error) {
            console.log(error)
        } finally {
          setLoadingChats(false);
        }
    };

    getChats();
}, [])

  return(
    <>
      <SideBar loadingChats={loadingChats} chats={chats} />
      <div className='wrapper'>
        <Header />
        <Chat />
      </div>
    </>
  )
}

export default Main