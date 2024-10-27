import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ItemDailyDietRegister, ItemDailyDietRegisterData } from "./item-daily-diet-register";

interface DailyDietProps {
    date: string
    itemData: ItemDailyDietRegisterData
}

export function DailyDietRegister({date, itemData}: DailyDietProps){
    return (
        <Card className="border-none shadow-none">
            <CardTitle className="text-xl text-custom-gray-600 dark:text-custom-gray-100">{date}</CardTitle>
            <CardContent className="mx-0 px-0">
                {itemData.map((item, index) => (
                    <ItemDailyDietRegister
                        key={index}
                        id={item.id}
                        hour={item.hour}
                        meal={item.meal}
                        isOnDiet={item.isOnDiet}
                    />
                ))}
            </CardContent>
        </Card>
    )
}