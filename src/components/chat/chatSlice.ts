import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LastMessage {
  text: string;
  sender: string;
  seen: boolean;
}

interface Member {
  _id: string;
  name: string;
  avatar: string;
}

interface Chat {
  _id: string;
  createdAt: string;
  lastMessage: LastMessage;
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
    },
    sortChats: (state) => {
      state.chats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    },
  }
})

export const { setChats, sortChats } = chatSlice.actions

export default chatSlice.reducer