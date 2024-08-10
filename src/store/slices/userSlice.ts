import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserI } from '../../types/types'

interface UserState {
    isUserAuth: boolean,
    user: UserI
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
        setCurrentUser: (state, action: PayloadAction<UserI>) => {
            state.user = action.payload
        }
    }
})

export const {reducer, actions} = userSlice