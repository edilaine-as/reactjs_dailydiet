import { api } from "@/lib/axios";

export interface RegisterDietBody {
    name: string
    description: string
    date: string
    isOnDiet: boolean
}

export async function registerDiet({name, description, isOnDiet, date}: RegisterDietBody) {
    await api.post('/diet', {name, description, isOnDiet, date})
    
}