import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import ProductItem from "../../components/productItem/ProductItem";

export interface productItem {
    id: number
    title: string
    description: string
    brand: string
    type: string
    image: string
    price: number
    memory: string | null
    discount: number, 
    amount: number
}

interface productProps {
    count: number, 
    rows: [productItem]
}

interface initialStateProps {
    products: productProps,
    currentFilter: string,
    currentBrand: string,
    currentType: string,
    currency: 'UAH' | 'USD',
    cart: productItem[],
}

const initialState: initialStateProps = {
    products: {
        count: 0,
        rows: [<productItem>{}]
    },
    currentFilter: '',
    currentBrand: '',
    currentType: '',
    currency: 'USD',
    cart: [<productItem>{}],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<productProps>) => {
            state.products = action.payload
        },
        setCurrentBrand: (state, action: PayloadAction<string>) => {
            state.currentBrand = action.payload
        },
        setCurrentType: (state, action: PayloadAction<string>) => {
            state.currentType = action.payload
        },
        setCurrency: (state, action: PayloadAction<'USD' | 'UAH'>) => {
            state.currency = action.payload
        },
        setCartProducts: (state, action: PayloadAction<[productItem]>) => {
            state.cart = action.payload
        },
        addProductToCart: (state, action: PayloadAction<productItem>) => {
            state.cart ? state.cart.unshift(action.payload) : state.cart = [action.payload]
        },
        deleteProductFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(el => el.id !== action.payload)
        },
        changeProductAmount: (state, action: PayloadAction<{id: number, newAmount: number}>) => {
            state.cart.findIndex((element,index) => {
                if(element.id == action.payload.id){
                    state.cart[index].amount = action.payload.newAmount
                }
            })
        },
        sortProducts: (state, action: PayloadAction<number>) => {
            action.payload == 1 ? 
            state.products.rows.sort((a, b) => b.price - a.price)
            :
            state.products.rows.sort((a, b) => a.price - b.price)
        }
    }
})

export const {reducer, actions} = productSlice