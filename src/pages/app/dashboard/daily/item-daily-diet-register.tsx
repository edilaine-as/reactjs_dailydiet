import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DialogDailyDiet } from "../dialog-daily-diet";
import { useState } from "react";

interface ItemDailyDietRegisterProps {
    id: string;
    hour: string;
    meal: string;
    isOnDiet: boolean;
}

// Definindo o tipo para um array de itens
export type ItemDailyDietRegisterData = ItemDailyDietRegisterProps[];

export function ItemDailyDietRegister({id, hour, meal, isOnDiet}: ItemDailyDietRegisterProps){
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center justify-between border rounded-md border-custom-gray-200 dark:border-custom-gray-500 p-4 mt-2">
                    <div className="flex gap-3">
                        <div className="font-semibold">
                            {hour}
                        </div>
                        <Separator orientation="vertical" className="h-6"  />
                        <div>{meal}</div>
                    </div>
                    {isOnDiet? <div className="rounded-full h-4 w-4 bg-custom-green-200 dark:bg-custom-green-300"></div> : <div className="rounded-full h-4 w-4 bg-custom-red-100 dark:bg-custom-red-400"></div>}
                </div>
            </DialogTrigger>
            <DialogDailyDiet dietId={id} open={isDetailsOpen}/>
        </Dialog>

    )
}