import axios from 'axios'

export const host = axios.create({
    baseURL: process.env.PORT || 'http://localhost:5000'
})

export const authHost = axios.create({
    baseURL: process.env.PORT || 'http://localhost:5000'
})

export const cacheHost = axios.create({
    baseURL: process.env.PORT || 'http://localhost:5000',
    // headers: {"Cache-Control" : "max-age=1, stale-while-revalidate=59"}
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

authHost.interceptors.request.use(authInterceptor)