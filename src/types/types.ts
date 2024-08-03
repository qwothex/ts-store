import { JwtPayload } from "jwt-decode"

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
    lastview?: []
}

export type {UserI}