import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DietOnDietCard(){
    return (
        <Card className="bg-custom-green-600 dark:bg-custom-green-400 border-none shadow-none">
            <CardHeader className="pb-1">
                <CardTitle className="text-2xl text-center text-custom-gray-100 dark:text-white">99</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-custom-gray-200 dark:text-white">
                refeições dentro da dieta
            </CardContent>
        </Card>
    )
}