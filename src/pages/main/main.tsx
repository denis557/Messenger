import './main.css'
import SideBar from "../../components/sideBar/sideBar"
import Header from "../../components/header/header"
import Chat from '../../components/chat/chat';
import { useParams } from 'react-router-dom';

function Main() {
  const id = useParams();
  console.log(id);

  return(
    <>
      <SideBar />
      <div className='wrapper'>
        <Header />
        <Chat />
      </div>
    </>
  )
}

export default Main