import { api } from "@/lib/axios";

export interface GetMetricsUserResponse {
    totalDiets: number
    totalDietsOnDiet: number
    totalDietsOffDiet: number
    bestOnDietSequence: number
  }

export async function getMetricsUser() {
    const response = await api.get<GetMetricsUserResponse>('/diet/metrics')
    
    return response.data
}