import { host, authHost } from "..";

export const createOrder = async (orderData: {products : [number], total: number}) => {
    const {data} = await authHost.post('api/order', orderData)
    return data
}