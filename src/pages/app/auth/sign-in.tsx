import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignIn(){
    return (
        <div>
            <div className="p-8">
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
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Senha</Label>
                        <Input id="email" type="email" />
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