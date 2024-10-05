import { ForkKnife } from "lucide-react";

export function Logo (){
    return (
        <div className="flex items-center gap-2">
            <ForkKnife className="h-6 w-6" />
            <p className="text-xs font-bold w-6">Daily Diet</p>
        </div>
    )
}