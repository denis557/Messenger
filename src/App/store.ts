import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice.ts'
import chatReducer from '../components/chat/chatSlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch