import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface messageInterface {
  message: {
    _id: string;
    chatId: string;
    userId: string;
    text: string;
    seen: boolean;
    isEdited: boolean;
    createdAt: string;
    updatedAt: string;
  }
}

const initialState: messageInterface = {
  message: {
    _id: '',
    chatId: '',
    userId: '',
    text: '',
    seen: false,
    isEdited: false,
    createdAt: '',
    updatedAt: '',
  }
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<messageInterface>) => {
      state.searchedUser = action.payload
    },
  }
})

export const { setSearchedUser } = searchedUserSlice.actions

export default searchedUserSlice.reducer