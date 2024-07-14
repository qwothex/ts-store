import { authHost, host } from ".."

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

export const getOneProduct = async(id: number) => {
    const {data} = await authHost.get('api/product/' + id)
    return data
}
