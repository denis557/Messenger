import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice.ts'
import chatReducer from '../components/chat/chatSlice.ts'
import searchedUserReducer from '../components/chat/searchedUserSlice.ts'
import pageReducer from '../components/sideBar/sideBarSlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    searchedUser: searchedUserReducer,
    page: pageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch