import axios from 'axios'

export const host = axios.create({
    baseURL: process.env.PORT || 'http://localhost:5000'
})

