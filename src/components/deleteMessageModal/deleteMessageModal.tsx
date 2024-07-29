import { useDispatch, useSelector } from 'react-redux';
import './deleteMessageModal.css'
import { setMessages } from '../message/messagesSlice';

function DeleteMessageModal({ setIsDeleteMessageOpen, message }) {
    const { selectedUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        }
    };

    const handleDeleteMessage = async() => {
        try {
            const res = await fetch(`/api/message/deleteMessage/${message._id}`, {
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
                console.log(data);
                return
            }

            getMessages();
            setIsDeleteMessageOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='modal_bg'>
            <div className='delete_chat_body'>
                <div className='delete_chat_title_div'>
                    <h1 className='delete_chat_title'>Delete message</h1>
                    <p className='delete_chat_action'>Are you sure you want to delete this message?</p>
                </div>
                <div className='delete_chat_actions_div'>
                    <p className='delete_chat_delete' onClick={handleDeleteMessage}>Delete this message</p>
                    {/* <p className='delete_chat_delete' onClick={() => console.log(message)}>Delete this message</p> */}
                    <p className='delete_chat_cancel' onClick={() => setIsDeleteMessageOpen(false)}>Cancel</p>
                </div>
            </div>
        </div>
    )
}

export default DeleteMessageModal