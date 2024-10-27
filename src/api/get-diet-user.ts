import { api } from "@/lib/axios";
import { Diet } from "./get-diets-user";

interface GetDietParams {
    dietId: string
}

export interface GetDietsUserResponse {
    diet: Diet;
}

export async function getDietUser({dietId}: GetDietParams) {
    const response = await api.get<GetDietsUserResponse>(`/diet/${dietId}`)
    
    return response.data
}