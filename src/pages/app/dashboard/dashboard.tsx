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
import { useQuery } from "@tanstack/react-query";
import { type Diet, getDietsUser } from "@/api/get-diets-user";
import { useEffect, useState } from "react";

interface ItemData {
    id: string;
    hour: string;
    meal: string;
    isOnDiet: boolean;
}

interface GroupedData {
    date: string;
    itemData: ItemData[];
}

export function Dashboard(){
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const { data: dietsUser } = useQuery({
        queryFn: getDietsUser,
        queryKey: ['diets']
    });

    const transformData = (dataArray: Diet[]): GroupedData[] => {
        const groupedData: GroupedData[] = [];
        
        dataArray.map(data => {
            const date = new Date(data.date);
            const formattedDate = date.toLocaleDateString("pt-BR");

            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');

            const newDateEntry = {
                date: formattedDate,
                itemData: []
            };

            if(groupedData.length == 0){
                groupedData.push(newDateEntry)

                groupedData[0].itemData.push({
                    id: data.id,
                    hour: `${hours}:${minutes}`,
                    meal: data.name,
                    isOnDiet: data.is_on_diet
                })
            }else{
                const existingEntry = groupedData.find(item => item.date == formattedDate);
            
                if(existingEntry){
                    existingEntry.itemData.push({
                        id: data.id,
                        hour: `${hours}:${minutes}`,
                        meal: data.name,
                        isOnDiet: data.is_on_diet
                    })
                }else {
                    groupedData.push(newDateEntry)

                    const existingEntry = groupedData.find(item => item.date == formattedDate);

                    if(existingEntry){
                        existingEntry.itemData.push({
                            id: data.id,
                            hour: `${hours}:${minutes}`,
                            meal: data.name,
                            isOnDiet: data.is_on_diet
                        })
                    }
                }
            }
        });

        // Ordenação de datas
        groupedData.sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('/').map(Number);
            const [dayB, monthB, yearB] = b.date.split('/').map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA); // Mês - 1 pois os meses começam em 0
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateA.getTime() - dateB.getTime();
        })
        
        // Ordenação de horário
        groupedData.forEach(group => {
            group.itemData.sort((a, b) => a.hour.localeCompare(b.hour))
        })

        return groupedData
    };


    const transformedData = dietsUser ? transformData(dietsUser.diet) : [];

    const [showDivs, setShowDivs] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)"); // md = 768px no Tailwind
        
        const handleResize = () => setShowDivs(mediaQuery.matches);

        handleResize(); // Verifica no carregamento inicial
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Estatísticas gerais</h2>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <DietOnDietPercentualCard icon={!showDivs} />
                    <DietOnDietSequenceCard className={`${!showDivs ? 'hidden' : ''}`}/>
                    <DietRegisterCard className={`${!showDivs ? 'hidden' : ''}`}/>
                    <DietOnDietCard className={`${!showDivs ? 'hidden' : ''}`}/>
                    <DietOffDietCard className={`${!showDivs ? 'hidden' : ''}`}/>
                </div>

                <h2 className="text-3xl font-bold tracking-tight">Refeições</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.isArray(transformedData) && transformedData.length > 0 ? 
                    transformedData.map((item, index) => (
                        <DailyDietRegister key={index} date={item.date} itemData={item.itemData} />
                    )) 
                : ''}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-end px-8 py-4">
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-custom-gray-500 dark:bg-custom-gray-100 flex gap-3 text-base p-6">
                            <Plus className="h-5 w-5" />
                            Nova Refeição
                        </Button>
                    </DialogTrigger>
                    <DialogDailyDiet dietId="" open={isDetailsOpen} onOpenChange={setIsDetailsOpen}/>
                </Dialog>
            </div>
        </div>
    )
}