import { loginUser } from "@/api/login-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { AxiosError } from 'axios';
import { Logo } from "@/components/logo";

const signInForm = z.object({
    email: z.string(),
    password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<SignInForm>()

    const { mutateAsync: loginUserFn } = useMutation({
        mutationFn: loginUser,
    })

    async function handleSignIn(data: SignInForm) {
        try{
            const response = await loginUserFn({
                email: data.email, 
                password: data.password
            })

            const { sessionId } = response;

            document.cookie = `sessionId=${sessionId}; path=/; secure; samesite=strict;`;

            console.log('Usuário autenticado com sucesso!');

            navigate(`/`)

        } catch (error) {

            if(error instanceof AxiosError){
                if(error.response?.data.message == 'User not found'){
                    toast.error('Usuário inválido, tente novamente!')
                    return
                }
    
                if(error.response?.data.message == 'Invalid credentials'){
                    toast.error('Senha inválida, tente novamente!')
                    return
                }
            }
            
            if(error){
                toast.error('Falha ao autenticar, tente novamente!')
                console.error(error)
            }
        }
    }

    return (
        <div>
            <div className="p-8">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground absolute left-4 top-8 md:hidden">
                    <Logo />
                </div>
                <Button variant={'ghost'} asChild className="absolute right-4 top-8">
                    <Link to="/sign-up" className="">
                        Cadastrar
                    </Link>
                </Button>

                <div className="flex w-[320px] flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tighter">
                    Acessar Daily Daily
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    Acompanhe suas refeições diariamente!
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" {...register("email")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" {...register("password")} />
                    </div>

                    <Button type="submit" className="w-full">
                    Acessar painel
                    </Button>
                </form>
                </div>
            </div>
        </div>
    )
}