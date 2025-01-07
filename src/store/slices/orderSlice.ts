import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderI, productItem } from "../../types/types";

interface initialStateI {
    orders: OrderI[]
}

const initialState: initialStateI = {
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<[OrderI]>) => {
            state.orders = action.payload
        }
    }
})

export const {reducer, actions} = orderSlice