import { host, authHost } from "..";
import { CartI, OrderI } from "../../types/types";

export const createOrder = async (orderData: {products : [CartI], total: number, userId: number}) => {
    const {data} = await authHost.post('api/order', orderData)
    return data
}

export const getOrders = async(userId: number) => {
    const {data} = await authHost.get('api/order', {params: {userId}})
    return data
}

export const getOneOrder = async(id: number) => {
    const {data} = await authHost.get('api/order/' + id)
    return data
}

export const changeOrderStatus = async(id: number, status: string) => {
    const {data} = await authHost.put('api/order/' + id, {params: {status}})
    return data
}