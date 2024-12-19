import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderI, productItem } from "../../types/types";

interface initialStateI {
    orders: OrderI[],
    currentOrderProducts: productItem[],
}

const initialState: initialStateI = {
    orders: [],
    currentOrderProducts: [],
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<[OrderI]>) => {
            state.orders = action.payload
        },
        setCurrentOrderProducts: (state, action: PayloadAction<productItem>) => {
            state.currentOrderProducts = [...state.currentOrderProducts, action.payload]
        },
        truncateCurrentOrderProducts: (state) => {
            state.currentOrderProducts = []
        },
        // changeLocalOrderStatus: (state, action: PayloadAction<{orderId: number, status: string}>) => {
        //     state.orders
        // },
    }
})

export const {reducer, actions} = orderSlice