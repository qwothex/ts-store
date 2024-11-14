import { authHost, host } from ".."
import { jwtDecode } from "jwt-decode"
import { productItem } from "../../store/slices/productSlice"

interface UserProps { (username: string, password: string): {} }

interface additionalDataProps { (additional: FormData): {} }

export const createUser: UserProps = async(username, password) => {
    const {data} = await host.post('api/user/registration', {username, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const loginUser: UserProps = async(username, password) => {
    const {data} = await host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const additionalData: additionalDataProps = async(additionalData) => {
    const {data} = await authHost.post('api/user/additional', additionalData)
    console.log(additionalData)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async() => {
    try{
        const {data} = await authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }catch(e){
        console.log(e)
        return null
    }
}

export const addLastView = async(id: number, productId: number) => {
    const {data} = await authHost.post('api/user/lastview', {id, productId})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const addCartProduct = async(id: number, productId: number, RAMvolume: string | null, RAMprice: number) => {
    const {data} = await authHost.post('api/user/cart', {id, productId, RAMvolume, RAMprice})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const deleteCartProduct = async(productId: number, id: number) => {
    const {data} = await authHost.post('api/user/cart/delete', {productId, id})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const truncateUserCart = async(id: number) => {
    const {data} = await authHost.delete('api/user/cart', {params: {
        id
    }})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}