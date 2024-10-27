import { api } from "@/lib/axios";

interface UpdateDietParams {
    dietId: string
}

export interface UpdateDietBody {
    name: string
    description: string
    date: string
    isOnDiet: boolean
}

export async function updateDiet({dietId}: UpdateDietParams, {name, description, isOnDiet, date}: UpdateDietBody) {
    await api.put(`/diet/${dietId}`, {name, description, isOnDiet, date})
}