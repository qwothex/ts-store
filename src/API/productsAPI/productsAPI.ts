import { authHost, host } from ".."

export const createProduct = async (product: FormData) => {
    const {data} = await authHost.post('api/product', product)
    return data
} 

export const getAllProducts = async(type: string | null, brand: string | null, limit = 3, page: number) => {
    const {data} = await host.get('api/product', {params: {
        type, brand, limit, page
    }})
    return data
}

export const getOneProduct = async(id:number) => {
    const {data} = await host.get('api/product/' + id)
    return data
}

export const deleteProduct = async(id: number) => {
    await authHost.delete('api/product/' + id)
}

export const addDiscount = async(id: number, price: number) => {
    const {data} = await authHost.post('/api/product/discount', {id, price})
    return data
}

export const changeProduct = async(id: number, changes: FormData) => {
    await authHost.put('api/product/' + id, changes)
}