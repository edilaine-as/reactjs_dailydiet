import { api } from "@/lib/axios";

export interface UpdateUserParams {
    userId: string
    name: string
    email: string
    avatar?: File
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function updateUser({userId, name, email, avatar}: UpdateUserParams) {
    const formData = {
        name,
        email,
        avatar: avatar ? await fileToBase64(avatar) : undefined,  // Converte para base64
    };

    await api.put(`/users/${userId}`, formData)
}