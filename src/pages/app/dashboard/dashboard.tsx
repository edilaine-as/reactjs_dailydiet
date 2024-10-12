import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DailyDietRegister } from "./daily/daily-diet-register";
import { DialogDailyDiet } from "./dialog-daily-diet";
import { DietOffDietCard } from "./metrics/diet-off-diet-card";
import { DietOnDietCard } from "./metrics/diet-on-diet-card";
import { DietOnDietPercentualCard } from "./metrics/diet-on-diet-percentual-card";
import { DietOnDietSequenceCard } from "./metrics/diet-on-diet-sequence-card";
import { DietRegisterCard } from "./metrics/diet-register-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const data = [
    {
        date: "05.10.24",
        itemData: [
            { hour: "08:00", meal: "Panqueca de banana", isOnDiet: true },
            { hour: "12:00", meal: "Filé de frango", isOnDiet: true },
            { hour: "15:00", meal: "Mamão com aveia", isOnDiet: true },
            { hour: "20:00", meal: "X-tudo", isOnDiet: false },
        ]
    },
]

export function Dashboard(){
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Estatísticas gerais</h2>

                <div className="grid grid-cols-5 gap-4">
                    <DietOnDietPercentualCard/>
                    <DietOnDietSequenceCard/>
                    <DietRegisterCard/>
                    <DietOnDietCard />
                    <DietOffDietCard/>
                </div>

                <h2 className="text-3xl font-bold tracking-tight">Refeições</h2>
                <div className="grid grid-cols-4 gap-4">
                    {data.map((item, index) => (
                        <DailyDietRegister key={index} date={item.date} itemData={item.itemData} />
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-end px-8 py-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-custom-gray-500 dark:bg-custom-gray-100 flex gap-3 text-base p-6">
                            <Plus className="h-5 w-5" />
                            Nova Refeição
                        </Button>
                    </DialogTrigger>
                    <DialogDailyDiet/>
                </Dialog>
            </div>
        </div>
    )
}