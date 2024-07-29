import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface messageInterface {
  _id: string;
  chatId: string;
  userId: string;
  text: string;
  seen: boolean;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface messagesInterface {
  messages: messageInterface[]
}

const initialState: messagesInterface = {
  messages: []
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<messageInterface[]>) => {
      state.messages = action.payload
    },
  }
})

export const { setMessages } = messageSlice.actions

export default messageSlice.reducer