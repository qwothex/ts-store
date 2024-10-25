import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserI } from '../../types/types'

interface UserState {
    isUserAuth: boolean,
    user: UserI
}

const initialState: UserState = {
    isUserAuth: false,
    user: {} as UserI
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
        },
        addProductToLocalCart: (state, action: PayloadAction<number>) => {
            state.user.cart?.push(action.payload)
        }
    }
})

export const {reducer, actions} = userSlice