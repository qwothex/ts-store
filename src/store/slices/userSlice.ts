import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartI, UserI } from '../../types/types'

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
        },
        addProductToLocalUserCart: (state, action: PayloadAction<CartI>) => {
            state.user.cart?.push(action.payload)
        },
        truncateLocalUserCart: (state) => {
            state.user.cart = []
        },
        changeUserProductAmount: (state, action: PayloadAction<{id: number, amount: number}>) => {
            state.user.cart![state.user.cart!.findIndex((el) => el.id == action.payload.id)].amount = action.payload.amount
        }
    }
})

export const {reducer, actions} = userSlice