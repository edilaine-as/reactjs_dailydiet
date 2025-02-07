import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/register-user";
import { toast } from "sonner";
import { Logo } from "@/components/logo";

const signUpForm = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<SignUpForm>()

    const { mutateAsync: registerUserFn } = useMutation({
        mutationFn: registerUser,
    })

    async function handleSignUp(data: SignUpForm) {
        try{
            await registerUserFn({
                name: data.name,
                email: data.email,
                password: data.password
            })

            toast.success('Usuario cadastrado com sucesso!', {
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in`),
                }
            })
            
        }catch {
            toast.error('Erro ao cadastrar usuário!')
        }
    }

    return (
        <div>
            <div className="p-8">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground absolute left-4 top-8 md:hidden">
                    <Logo />
                </div>
                <Button variant={'ghost'} asChild className="absolute right-4 top-8">
                    <Link to="/sign-in" className="">
                        Login
                    </Link>
                </Button>

                <div className="flex w-[320px] flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tighter">
                    Crie uma conta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    Seja um usuário e acompanhe suas refeições diariamente!
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" type="name" {...register('name')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" {...register('email')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" {...register('password')} />
                    </div>

                    <Button type="submit" className="w-full">
                    Cadastrar
                    </Button>
                </form>
                </div>
            </div>
        </div>
    )
}