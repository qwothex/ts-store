import { host, authHost } from "..";

export const createOrder = async (orderData: {products : [number], total: number, userId: number}) => {
    const {data} = await authHost.post('api/order', orderData)
    return data
}

export const getOrders = async(userId: number) => {
    const {data} = await authHost.get('api/order', {params: {userId}})
    return data
}