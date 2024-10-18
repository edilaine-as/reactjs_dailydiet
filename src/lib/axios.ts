import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true, // Permitir o envio de cookies em todas as requisições
})