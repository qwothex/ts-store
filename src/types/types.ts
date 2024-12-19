import { JwtPayload } from "jwt-decode"

interface CartI{
    id: number, 
    RAMvolume: string | null, 
    RAMprice: number,
    amount: number
}

interface UserI extends JwtPayload {
    id?: number,
    role?: string,
    username?: string,
    additional?: {name: string, bio: string, location: string, telegram: string, image: string},
    lastview?: [number],
    cart?: CartI[]
}

interface DetailedDescription {
    display?: string,
    camera?: string,
    os?: string,
    processor?: string,
    size?: string,
    materials?: string,
    manufacturer?: string
}

interface productItem {
    id: number
    title: string
    description: string
    brand: string
    type: string
    image: string
    price: number
    memory: string | null
    discount: number, 
    amount: number,
    detailedDescription: DetailedDescription | null
}

interface OrderI {
    id: number,
    userId: number,
    products: [],
    total: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
}

export type {UserI, OrderI, CartI, DetailedDescription, productItem}