import { JwtPayload } from "jwt-decode"
import { productItem } from "../store/slices/productSlice"

interface additionalInterface {
    name: string,
    bio: string,
    location: string, 
    telegram: string,
    image: string
}

interface UserI extends JwtPayload {
    id?: number,
    role?: string,
    username?: string,
    additional?: additionalInterface,
    lastview?: [number],
    cart?: [productItem]
}

export type {UserI}