import { getMetricsUser } from "@/api/get-metrics-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export function DietOnDietPercentualCard(){
    const { data: metricsUser } = useQuery({
        queryFn: getMetricsUser,
        queryKey: ['metrics'],
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    const percent = metricsUser?.totalDiets ? Math.round((metricsUser?.totalDietsOnDiet * 100) / metricsUser?.totalDiets) : 0;

    return (
        <Card className="bg-custom-green-200 dark:bg-custom-green-300 border-none shadow-none">
            <CardHeader className="pb-1">
                <CardTitle className="text-2xl text-center text-custom-gray-600 dark:text-white">{percent}%</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-custom-gray-500 dark:text-white">
                das refeições dentro da dieta
            </CardContent>
        </Card>
    )
}