import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DietOffDietCard(){
    return (
        <Card className="bg-custom-red-600 dark:bg-custom-red-500 border-none shadow-none">
            <CardHeader className="pb-1">
                <CardTitle className="text-2xl text-center text-custom-gray-100 dark:text-white">10</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-custom-gray-100 dark:text-white">
                refeições fora da dieta
            </CardContent>
        </Card>
    )
}