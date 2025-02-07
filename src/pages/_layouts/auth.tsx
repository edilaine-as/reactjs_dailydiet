import { Logo } from "@/components/logo";
import { Outlet } from "react-router-dom";
import Hero from "/daily-diet.svg"

export function AuthLayout(){
    return (
        <div className="grid min-h-screen md:grid-cols-2 antialiased">
            <div className="hidden md:flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground ">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                <Logo />
                </div>
                <img src={Hero} alt="" className="max-w-xl h-auto block" />
                <footer className="text-sm">
                Painel do parceiro &copy; daily.diet - {new Date().getFullYear()}
                </footer>
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}