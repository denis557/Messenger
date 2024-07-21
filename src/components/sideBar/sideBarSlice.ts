import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface pageInterface {
    page: string
}

const initialState: pageInterface = {
    page: 'main'
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<pageInterface>) => {
            state.page = action.payload.page
        }
    }
})

export const { setPage } = pageSlice.actions

export default pageSlice.reducer