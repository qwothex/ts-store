import { JwtPayload } from "jwt-decode"

interface UserI extends JwtPayload {
    id?: number,
    role?: string,
    username?: string,
    additional?: {name: string, bio: string, location: string, telegram: string, image: string},
    lastview?: [number],
    cart?: [number]
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