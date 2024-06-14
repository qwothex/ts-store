import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    isUserAuth: boolean
    user: {}
}

const initialState: UserState = {
    isUserAuth: false,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAuth: (state, action: PayloadAction<boolean>) => {
            state.isUserAuth = action.payload
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {reducer, actions} = userSlice