import { Separator } from "@/components/ui/separator";

interface ItemDailyDietRegisterProps {
    hour: string;
    meal: string;
    isOnDiet: boolean;
}

// Definindo o tipo para um array de itens
export type ItemDailyDietRegisterData = ItemDailyDietRegisterProps[];

export function ItemDailyDietRegister({hour, meal, isOnDiet}: ItemDailyDietRegisterProps){
    return (
        <div className="flex items-center justify-between border rounded-md border-custom-gray-500 dark:border-custom-gray-200 p-4 mt-2">
            <div className="flex gap-3">
                <div className="font-semibold">
                    {hour}
                </div>
                <Separator orientation="vertical" className="h-6"  />
                <div>{meal}</div>
            </div>
            {isOnDiet? <div className="rounded-full h-4 w-4 bg-custom-green-600 dark:bg-custom-green-400"></div> : <div className="rounded-full h-4 w-4 bg-custom-red-600 dark:bg-custom-red-400"></div>}
        </div>
    )
}