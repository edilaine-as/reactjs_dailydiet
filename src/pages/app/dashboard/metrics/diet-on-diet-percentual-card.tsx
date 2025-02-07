import { getMetricsUser } from "@/api/get-metrics-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MoveUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DietOnDietSequenceCard } from "./diet-on-diet-sequence-card";
import { DietRegisterCard } from "./diet-register-card";
import { DietOnDietCard } from "./diet-on-diet-card";
import { DietOffDietCard } from "./diet-off-diet-card";

export function DietOnDietPercentualCard({ className = "", icon = false }){
    const { data: metricsUser } = useQuery({
        queryFn: getMetricsUser,
        queryKey: ['metrics'],
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    const showDivs = icon

    const percent = metricsUser?.totalDiets ? Math.round((metricsUser?.totalDietsOnDiet * 100) / metricsUser?.totalDiets) : 0;

    return (
        <Dialog>
            <Card className={`bg-custom-green-200 dark:bg-custom-green-300 border-none shadow-none ${className}`}>
            <div className="relative">
                
                
                <DialogTrigger className="absolute top-2 right-2 cursor-pointer" asChild>
                    {icon && (
                        <MoveUpRight className="h-5 w-5" />
                    )}
                </DialogTrigger>
            </div>

                
                <CardHeader className="pb-1">
                    <CardTitle className="text-2xl text-center text-custom-gray-600 dark:text-white">{percent}%</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-custom-gray-500 dark:text-white">
                    das refeições dentro da dieta
                </CardContent>
            </Card>

            <DialogContent className="sm:max-w-[625px] h-full p-0" aria-describedby={undefined}>
                <DialogHeader className="bg-custom-gray-200 dark:bg-custom-gray-500 p-5 max-h-[60px]">
                    <DialogTitle className="text-center">Estatísticas gerais</DialogTitle>
                </DialogHeader>
                <div className="grid sm:grid-cols-1 px-5 pb-5 gap-5">
                    <DietOnDietPercentualCard icon={!showDivs} />
                    <DietOnDietSequenceCard className={`${!showDivs ? 'hidden' : ''}`}/>
                    <DietRegisterCard className={`${!showDivs ? 'hidden' : ''}`}/>
                    <div className={`${!showDivs ? 'hidden' : ''} flex gap-5`}>
                        <DietOnDietCard />
                        <DietOffDietCard />
                    </div>
                </div>
                
            </DialogContent>

        </Dialog>
    )
}