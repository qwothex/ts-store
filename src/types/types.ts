import { JwtPayload } from "jwt-decode"

export interface CartI{
    id: number, 
    RAMvolume: string, 
    RAMprice: number
}

interface UserI extends JwtPayload {
    id?: number,
    role?: string,
    username?: string,
    additional?: {name: string, bio: string, location: string, telegram: string, image: string},
    lastview?: [number],
    cart?: [CartI]
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

export type {UserI, OrderI}