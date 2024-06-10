import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    isUserAuth: boolean
    user: []
}

const initialState: UserState = {
    isUserAuth: false,
    user: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAuth: (state, action) => {
            state.isUserAuth = action.payload
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {reducer, actions} = userSlice