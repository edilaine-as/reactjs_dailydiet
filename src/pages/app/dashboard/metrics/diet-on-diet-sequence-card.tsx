import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DietOnDietSequenceCard(){
    return (
        <Card className="bg-custom-gray-600 dark:bg-custom-gray-200 border-none shadow-none">
            <CardHeader className="pb-1">
                <CardTitle className="text-2xl text-center text-custom-gray-100 dark:text-white">22</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-custom-gray-200 dark:text-white">
                melhor sequência de pratos dentro da dieta
            </CardContent>
        </Card>
    )
}