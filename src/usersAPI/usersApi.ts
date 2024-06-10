import { host } from "."

interface createUserProps { (login: string, password: string): {} }

export const createUser: createUserProps = async(login, password) => {
    await host.post('/users', {login, password})
}

export const loginUser = async(login : string) => {
    const data = host.get('/users?login=' + login)
    return data
}