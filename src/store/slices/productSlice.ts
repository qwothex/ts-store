import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productItem } from "../../types/types";

export interface DetailedDescription {
    display?: string,
    camera?: string,
    os?: string,
    processor?: string,
    size?: string,
    materials?: string,
    manufacturer?: string
}

export interface productProps {
    count: number, 
    rows: productItem[]
}

interface initialStateProps {
    products: productProps,
    currentFilter: string,
    currency: 'UAH' | 'USD',
    cart: productItem[],
    lastview: productItem[]
}

const initialState: initialStateProps = {
    products: {
        count: 0,
        rows: [<productItem>{}]
    },
    currentFilter: '',
    currency: 'USD',
    cart: [],
    lastview: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<productProps>) => {
            state.products = action.payload
        },
        setCurrency: (state, action: PayloadAction<'USD' | 'UAH'>) => {
            state.currency = action.payload
        },
        setCartProducts: (state, action: PayloadAction<[productItem]>) => {
            state.cart = action.payload
        },
        addProductToLocalCart: (state, action: PayloadAction<productItem>) => {
            state.cart ? state.cart.unshift(action.payload) : state.cart = [action.payload]
        },
        deleteProductFromLocalCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(el => el.id !== action.payload)
        },
        truncateLocalCart: (state) => {
            state.cart = []
        },
        changeProductAmount: (state, action: PayloadAction<{id: number, newAmount: number}>) => {
            state.cart.map((el, index) => {
                if(el.id == action.payload.id) state.cart[index].amount = action.payload.newAmount
            })
        },
        sortProducts: (state, action: PayloadAction<number>) => {
            action.payload == 1 ? 
            state.products.rows.sort((a, b) => b.price - a.price)
            :
            state.products.rows.sort((a, b) => a.price - b.price)
        },
        addLastViewProduct: (state, action: PayloadAction<productItem>) => {
            try{
                if(!state.lastview.length) {
                    state.lastview.push(action.payload)
                }else{
                    let isExist = false;
                    state.lastview.forEach((el) => { if(el.id == action.payload.id) isExist = true })
                    if(!isExist){state.lastview.unshift(action.payload)}
                }
            }catch(e){
                console.log(e)
            }
        },
        truncateLastViewProducts: (state) => {
            state.lastview = []
        }
    }
})

export const {reducer, actions} = productSlice

