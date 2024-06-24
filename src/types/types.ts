import { JwtPayload } from "jwt-decode"
import { Json } from "sequelize/types/utils"

interface additionalInterface {
    name: string,
    bio: string,
    location: string, 
    telegram: string
}

interface MyJwtPayload extends JwtPayload {
    id?: number,
    role?: string,
    username?: string,
    additional?: additionalInterface
}

export type {MyJwtPayload}