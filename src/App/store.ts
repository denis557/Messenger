import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice.ts'
import chatReducer from '../components/chat/chatSlice.ts'
import messagesReducer from '../components/message/messagesSlice.ts'
import searchedUserReducer from '../components/searchedUser/searchedUserSlice.ts'
import pageReducer from '../components/sideBar/sideBarSlice.ts'
import modeReducer from '../components/messageInput/modeSlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    messages: messagesReducer,
    searchedUser: searchedUserReducer,
    page: pageReducer,
    mode: modeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch