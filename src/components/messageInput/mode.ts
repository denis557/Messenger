import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface modeInterface {
    mode: string
}

const initialState: modeInterface = {
    mode: 'reply'
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<modeInterface>) => {
            state.mode = action.payload.mode
        }
    }
})

export const { setMode } = modeSlice.actions

export default modeSlice.reducer