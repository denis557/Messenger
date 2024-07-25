import { useDispatch, useSelector } from 'react-redux';
import './deleteChatModal.css'
import { selectUser } from '../user/userSlice';
import { setChats } from '../chat/chatSlice';

function DeleteChatModal({ setIsDeleteChatOpen }) {
    const { selectedUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        }
    };

    const handleDeleteChat = async () => {
        try {
            const res = await fetch(`/api/message/deleteChat/${selectedUser._id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    otherUserId: selectedUser.userId
                })
            });

            const data = await res.json();
            if(data.error) {
                console.log(data.message);
                return
            }
            dispatch(selectUser({ selectedUser: { _id: '', userId: '', username: '', avatar: '' } }));
            getChats();
            setIsDeleteChatOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='modal_bg'>
            <div className='delete_chat_body'>
                <div className='delete_chat_title_div'>
                    <h1 className='delete_chat_title'>Delete chat</h1>
                    <p className='delete_chat_action'>Are you sure you want to delete this chat?</p>
                </div>
                <div className='delete_chat_actions_div'>
                    <p className='delete_chat_delete' onClick={handleDeleteChat}>Delete this chat</p>
                    <p className='delete_chat_cancel' onClick={() => setIsDeleteChatOpen(false)}>Cancel</p>
                </div>
            </div>
        </div>
    )
}

export default DeleteChatModal