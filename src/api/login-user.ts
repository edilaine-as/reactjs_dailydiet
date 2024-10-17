import { api } from "@/lib/axios";

export interface LoginUserBody {
    email: string
    password: string
}

export interface LoginUserResponse {
    message: string
    userId: string
  }

export async function loginUser({email, password}: LoginUserBody) {
    const response = await api.post('/users/login', {email, password})
    
    return response.data
}