import { getMetricsUser } from "@/api/get-metrics-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export function DietOffDietCard(){
    const { data: metricsUser } = useQuery({
        queryFn: getMetricsUser,
        queryKey: ['metrics'],
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    return (
        <Card className="bg-custom-red-100 dark:bg-custom-red-500 border-none shadow-none">
            <CardHeader className="pb-1">
                <CardTitle className="text-2xl text-center text-custom-gray-600 dark:text-white">{metricsUser?.totalDietsOffDiet}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-custom-gray-600 dark:text-white">
                refeições fora da dieta
            </CardContent>
        </Card>
    )
}