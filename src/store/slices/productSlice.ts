import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface productItem {
    id: number
    title: string
    description: string
    brand: string
    type: string
    image: string
    price: number
    memory: string | null
    discount: number
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
    currency: 'UAH' | 'USD'
}

const initialState: initialStateProps = {
    products: {
        count: 0,
        rows: [<productItem>{}]
    },
    currentFilter: '',
    currentBrand: '',
    currentType: '',
    currency: 'USD'
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
        }
    }
})

export const {reducer, actions} = productSlice