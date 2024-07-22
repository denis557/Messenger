import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface searchedUser {
  searchedUser: {
    _id: string;
    name: string;
    avatar: string;
  }
}

const initialState: searchedUser = {
  searchedUser: {
    _id: '',
    name: '',
    avatar: ''
  }
}

export const searchedUserSlice = createSlice({
  name: 'searchedUser',
  initialState,
  reducers: {
    setSearchedUser: (state, action: PayloadAction<searchedUser>) => {
      state.searchedUser = action.payload
    },
  }
})

export const { setSearchedUser } = searchedUserSlice.actions

export default searchedUserSlice.reducer