import { authHost, host } from ".."
import { jwtDecode } from "jwt-decode"

interface UserProps { (username: string, password: string): {} }

interface additionalDataProps { (id: number, name: string, bio: string, location: string, telegram: string): {} }

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

export const additionalData: additionalDataProps = async(id, name, bio, location, telegram) => {
    const {data} = await host.post('api/user/additional', {id, name, bio, location, telegram})
    return jwtDecode(data.token)
}

export const check = async() => {
    const {data} = await authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}