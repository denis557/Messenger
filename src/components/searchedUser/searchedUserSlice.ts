import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface searchedUserInterface {
  searchedUser: {
    _id: string;
    name: string;
    avatar: string;
  }
}

const initialState: searchedUserInterface = {
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
    setSearchedUser: (state, action: PayloadAction<searchedUserInterface>) => {
      state.searchedUser = action.payload
    },
  }
})

export const { setSearchedUser } = searchedUserSlice.actions

export default searchedUserSlice.reducer