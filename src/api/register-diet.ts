import { api } from "@/lib/axios";

export interface RegisterDietParams {
    name: string
    description: string
    date: string
    isOnDiet: boolean
}

export async function registerDiet({name, description, isOnDiet, date}: RegisterDietParams) {
    await api.post('/diet', {name, description, isOnDiet, date})
    
}