import { api } from "@/lib/axios";

export interface Diet {
    id: string;
    name: string;
    description: string;
    is_on_diet: boolean;
    user_id: string;
    date: number;
}

export interface GetDietsUserResponse {
    diet: Diet[];
}

export async function getDietsUser() {
    const response = await api.get<GetDietsUserResponse>('/diet')
    
    return response.data
}