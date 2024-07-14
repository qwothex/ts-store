import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface productItem {
    id: number
    title: string
    description: string
    brand: string
    type: string
    image: string
    price: number
}

interface productProps {
    count: number, 
    rows: [productItem]
}

interface initialStateProps {
    products: productProps
}

const initialState: initialStateProps = {
    products: {
        count: 0,
        rows: [<productItem>{}]
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<productProps>) => {
            state.products = action.payload
        }
    }
})

export const {reducer, actions} = productSlice