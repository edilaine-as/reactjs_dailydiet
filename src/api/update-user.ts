import { api } from "@/lib/axios";

export interface UpdateUserParams {
    userId: string
    name: string
    email: string
    // avatar: string
}

export async function updateUser({userId, name, email}: UpdateUserParams) {
    await api.put(`/users/${userId}`, {name, email})
}