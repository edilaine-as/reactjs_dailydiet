import { updateUser, UpdateUserParams } from "@/api/update-user";
import { AvatarUploader } from "@/components/avatar-uploader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
}

interface UserSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User;
}

const dialogDailyDietForm = z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.instanceof(File).optional(),
})

type DialogUserSettingsForm = z.infer<typeof dialogDailyDietForm>

export function DialogUserSettings({ open, onOpenChange, user }: UserSettingsDialogProps){
    const queryClient = useQueryClient();
    const { setValue, register, handleSubmit } = useForm<DialogUserSettingsForm>()

    useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
        }
    }, [user, setValue]);

    
    const mutationUpdateUser = useMutation<void, Error, UpdateUserParams>({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success('Usuário atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error('Falha ao atualizar usuário, tente novamente!');
            console.error(error);
        }
    });

    async function handleUpdateUser(data: DialogUserSettingsForm){
        if(!user){
            return;
        }

        try {
            await mutationUpdateUser.mutateAsync({ 
                userId: user.id, 
                name: data.name, 
                email: data.email,
                avatar: data.avatar
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px] p-0" aria-describedby={undefined}>
                <DialogHeader className="bg-custom-gray-200 dark:bg-custom-gray-500 rounded-t-lg p-5">
                    <DialogTitle className="text-center">Configurações</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleUpdateUser)} className="px-5 pb-5">
                    <div className="md:flex justify-end gap-6">
                        <div className="md:order-2 sm:order-1 size-32">
                            <AvatarUploader user={user} register={register} setValue={setValue}/>
                        </div>

                        <div className="md:order-1 flex-1">
                            <div>
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" className="col-span-3 focus-visible:ring-0 focus-visible:ring-offset-0" {...register("name")} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" className="col-span-3 focus-visible:ring-0 focus-visible:ring-offset-0" {...register("email")} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button className="bg-custom-gray-500 dark:bg-custom-gray-100" type="submit">Atualizar dados</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        
    )
}