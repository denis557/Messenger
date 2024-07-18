import './main.css'
import SideBar from "../../components/sideBar/sideBar"
import Header from "../../components/header/header"
import Chat from '../../components/chat/chat';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChats, sortChats } from '../../components/chat/chatSlice';

function Main() {
  const [loadingChats, setLoadingChats] = useState(true);
  // const { chats } = useSelector(state => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
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
          setLoadingChats(false);
          dispatch(sortChats());
        }
    };

    getChats();
}, [])

  return(
    <>
      <SideBar loadingChats={loadingChats} />
      <div className='wrapper'>
        <Header />
        <Chat />
      </div>
    </>
  )
}

export default Main