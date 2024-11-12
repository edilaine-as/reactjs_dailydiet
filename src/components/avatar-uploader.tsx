import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface AvatarUploaderProps {
    user?: { name: string, avatar: string };
    register: UseFormRegister<any>;
    setValue: (name: "avatar", value: File) => void;
}

export function AvatarUploader({user, register, setValue} : AvatarUploaderProps){
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);  // Armazena a base64 da imagem
                setValue('avatar', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const uploadBasePath = '@/../images/users/';

    useEffect(() => {
        if (user?.avatar) {
          setImage(`${uploadBasePath}${user.avatar}`);
        }
      }, [user?.avatar]);

    return (
        <>
            <input
                {...register('avatar')}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            <div onClick={handleAvatarClick} className="h-full w-full cursor-pointer">
                <Avatar className="h-full w-full">
                {image ? (
                    <AvatarImage src={image} alt="Avatar" />
                ) : (
                    <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback> )}
                </Avatar>
                
            </div>
        </>
    )
}