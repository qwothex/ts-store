import { authHost, host } from ".."
import { jwtDecode } from "jwt-decode"

interface productProps {(product: FormData): {}}

export const createProduct: productProps = async (product) => {
    const {data} = await authHost.post('api/product', product)
    return data
} 

export const getAllProducts = async(type: string | null, brand: string | null, limit = 3, page: number) => {
    const {data} = await authHost.get('api/product', {params: {
        type, brand, limit, page
    }})
    return data
}