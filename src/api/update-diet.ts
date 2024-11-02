import { api } from "@/lib/axios";

export interface UpdateDietParams {
    dietId: string
    name: string
    description: string
    date: string
    isOnDiet: boolean
}

export async function updateDiet({dietId, name, description, isOnDiet, date}: UpdateDietParams) {
    await api.put(`/diet/${dietId}`, {name, description, isOnDiet, date})
}