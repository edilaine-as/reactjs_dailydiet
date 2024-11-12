import { Home, LogOut, UserRoundCog } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { Logo } from "./logo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { DialogUserSettings } from "@/pages/app/dashboard/dialog-user-settings";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/api/get-user";
import { useQuery } from "@tanstack/react-query";

export function Header(){
    const [dialogOpen, setDialogOpen] = useState(false);
    const [image, setImage] = useState<string | ''>('');
    const navigate = useNavigate()

    const handleSignOut = () => {
        document.cookie = `sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

        setTimeout(() => {
            navigate('/sign-in', { replace: true });
        }, 500);
    }

    const { data: user } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
    });

    const uploadBasePath = '@/../images/users/';

    useEffect(() => {
        if (user?.user.avatar) {
          setImage(`${uploadBasePath}${user.user.avatar}`);
        }
      }, [user?.user.avatar]);

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={image} />
                                <AvatarFallback>{user?.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>{user?.user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex gap-2" onClick={() => setDialogOpen(true)}>
                                <UserRoundCog className="h-5 w-5" />
                                <span>Configurações</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2" onClick={() => handleSignOut()}>
                                <LogOut className="h-5 w-5" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                        <DialogUserSettings open={dialogOpen} onOpenChange={setDialogOpen} user={user?.user}/>

                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}