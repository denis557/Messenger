import './deleteChatModal.css'

function DeleteChatModal({ setIsDeleteChatOpen }) {
    return (
        <div className='modal_bg'>
            <div className='delete_chat_body'>
                <div className='delete_chat_title_div'>
                    <h1 className='delete_chat_title'>Delete chat</h1>
                    <p className='delete_chat_action'>Are you sure you want to delete this chat?</p>
                </div>
                <div className='delete_chat_actions_div'>
                    <p className='delete_chat_delete'>Delete this chat</p>
                    <p className='delete_chat_cancel' onClick={() => setIsDeleteChatOpen(false)}>Cancel</p>
                </div>
            </div>
        </div>
    )
}

export default DeleteChatModal