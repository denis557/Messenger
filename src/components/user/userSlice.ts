import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInterface {
    selectedUser: {
        _id: string,
        userId: string,
        username: string
    }
}

const initialState: userInterface = {
    selectedUser: {
        _id: '',
        userId: '',
        username: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<userInterface>) => {
            state.selectedUser._id = action.payload.selectedUser._id;
            state.selectedUser.userId = action.payload.selectedUser.userId;
            state.selectedUser.username = action.payload.selectedUser.username
        }
    }
});

export const { selectUser } = userSlice.actions

export default userSlice.reducer