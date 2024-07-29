import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface modeInterface {
    mode: {
        mode: string,
        messageId: string
    }
}

const initialState: modeInterface = {
    mode: {
        mode: 'default',
        messageId: ''
    }
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