import { Home } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { Logo } from "./logo";

export function Header(){
    return(
        <div className="border-b">
            <div className="flex items-center gap-6 px-6 h-16">
                
                <Logo />

                <Separator orientation="vertical" className="h-6"  />

                <nav>
                    <NavLink to="/">
                        <Home className="h-4 w-4" /> Início
                    </NavLink>
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}