import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MyJwtPayload } from '../../types/types'

interface UserState {
    isUserAuth: boolean,
    user: MyJwtPayload
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
        setCurrentUser: (state, action: PayloadAction<MyJwtPayload>) => {
            state.user = action.payload
        }
    }
})

export const {reducer, actions} = userSlice