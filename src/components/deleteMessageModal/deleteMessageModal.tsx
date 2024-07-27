import { useDispatch, useSelector } from 'react-redux';
import './deleteChatModal.css'

function DeleteChatModal({ setIsDeleteMessageOpen }) {
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
            setMessages(data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleDeleteChat = async () => {
    //     try {
    //         const res = await fetch(`/api/message/deleteChat/${selectedUser._id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 otherUserId: selectedUser.userId
    //             })
    //         });

    //         const data = await res.json();
    //         if(data.error) {
    //             console.log(data.message);
    //             return
    //         }
    //         dispatch(selectUser({ selectedUser: { _id: '', userId: '', username: '', avatar: '' } }));
    //         getChats();
    //         setIsDeleteChatOpen(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleDeleteMessage = async(message) => {
        try {
            const res = await fetch(`/api/message/${message._id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
            });
            const data = await res.json();

            if(data.error) {
                console.log(data);
                return
            }

            
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