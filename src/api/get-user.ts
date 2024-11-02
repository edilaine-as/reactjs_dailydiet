import { api } from "@/lib/axios";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
}

export interface GetUserResponse {
    user: User;
}

export async function getUser() {
    const response = await api.get<GetUserResponse>(`/users`)
    
    return response.data
}