import { host } from "."
import { jwtDecode } from "jwt-decode"

interface UserProps { (username: string, password: string): {} }

export const createUser: UserProps = async(username, password) => {
    const {data} = await host.post('api/user/registration', {username, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const loginUser: UserProps = async(username, password) => {
    const {data} = await host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}