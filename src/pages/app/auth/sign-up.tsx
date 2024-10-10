import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignUp(){
    return (
        <div>
            <div className="p-8">
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
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" type="name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" />
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