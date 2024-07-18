import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  sender: string;
}

interface Member {
  _id: string;
  name: string;
  avatar: string;
}

interface Chat {
  _id: string;
  createdAt: string;
  lastMessage: Message;
  members: Member[];
  updatedAt: string;
}

export interface Chats {
  chats: Chat[]
}

const initialState: Chats = {
  chats: []
}

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload
    }
  }
})

export const { setChats } = chatSlice.actions

export default chatSlice.reducer