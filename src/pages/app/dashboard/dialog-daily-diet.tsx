import { GetDietsUserResponse, getDietUser } from "@/api/get-diet-user";
import { registerDiet, RegisterDietParams } from "@/api/register-diet";
import { updateDiet, UpdateDietParams } from "@/api/update-diet";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DietDialogProps {
    dietId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const dialogDailyDietForm = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string(),
    hour: z.string(),
    is_on_diet: z.boolean()
})

type DialogDailyDietForm = z.infer<typeof dialogDailyDietForm>

export function DialogDailyDiet({ dietId, open, onOpenChange }: DietDialogProps){
    const queryClient = useQueryClient();

    const [date, setDate] = useState<Date>()
    const [isOnDiet, setIsOnDiet] = useState<boolean | null>(null);
    const { setValue, register, handleSubmit } = useForm<DialogDailyDietForm>()

    const { data: dietDetails } = useQuery<GetDietsUserResponse>({
        queryFn: () => getDietUser({dietId}),
        queryKey: ['dietDetails', dietId],
        enabled: open,
    });

    useEffect(() => {
        if(dietDetails?.diet){
            setValue("name", dietDetails.diet?.name);
            setValue("description", dietDetails.diet?.description);

            if(dietDetails.diet?.date){
                let date = new Date(dietDetails.diet.date);
                const hours = date.getUTCHours().toString().padStart(2, '0');
                const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                setValue("hour", `${hours}:${minutes}`);

                setDate(date); // componente Calendar
                setValue('date', date.toISOString().split('T')[0]);
            }

            setIsOnDiet(dietDetails.diet.is_on_diet? true : false)
            setValue("is_on_diet", dietDetails.diet.is_on_diet? true : false);
        }
    }, [dietDetails, setValue]);

    const handleClick = (value: boolean) => () => {
        setIsOnDiet(value);
        setValue('is_on_diet', value);
    };

    const mutationRegisterDiet = useMutation<void, Error, RegisterDietParams>({
        mutationFn: registerDiet,
        onSuccess: () => {
            toast.success('Refeição criada com sucesso!')
            queryClient.invalidateQueries({queryKey: ['metrics']}); // invalida minha consulta de metrics
            queryClient.invalidateQueries({queryKey: ['diets']});
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error('Falha ao criar refeição, tente novamente!')
            console.error(error)
        }
    })

    const mutationUpdateDiet = useMutation<void, Error, UpdateDietParams>({
        mutationFn: updateDiet,
        onSuccess: () => {
            toast.success('Refeição atualizada com sucesso!')
            queryClient.invalidateQueries({queryKey: ['metrics']});
            queryClient.invalidateQueries({queryKey: ['diets']});
            onOpenChange(false)
        }, 
        onError: (error) => {
            toast.error('Falha ao atualizar refeição, tente novamente!')
            console.error(error)
        }
    })

    async function handleRegisterDiet(data: DialogDailyDietForm) {
        const date = data.date + 'T' + data.hour + ':00.000Z'
        const isOnDiet = JSON.parse(String(data.is_on_diet));
        
        if(dietId === ""){
            try{
                await mutationRegisterDiet.mutateAsync({
                    name: data.name,
                    description: data.description,
                    date: date,
                    isOnDiet: isOnDiet
                })
            } catch (error) {
                console.error('Erro ao criar refeição:', error);
            }
        }else{
            try {
                await mutationUpdateDiet.mutateAsync({ 
                    dietId: dietId,
                    name: data.name,
                    description: data.description,
                    date: date,
                    isOnDiet: isOnDiet
                });
            } catch (error) {
                console.error('Erro ao atualizar refeição:', error);
            }
        }
    }

    return (
        <DialogContent className="md:max-w-[425px] p-0" aria-describedby={undefined}>
            <DialogHeader className="bg-custom-gray-200 dark:bg-custom-gray-500 rounded-t-lg p-5 max-h-[60px]">
                <DialogTitle className="text-center">Nova refeição</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleRegisterDiet)} className="px-5 pb-5">
                <div className="flex flex-col gap-3">
                    <div>
                        <Label htmlFor="name">
                        Nome
                        </Label>
                        <Input
                        id="name"
                        className="col-span-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...register("name")}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">
                        Descrição
                        </Label>
                        <Textarea
                        id="description"
                        className="col-span-3 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...register("description")}
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <div>
                            <Label className="mb-1 block" htmlFor="date" >
                            Data
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={"justify-start text-left font-normal"}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate); // Atualiza o calendário
                                        setValue('date', selectedDate ? selectedDate.toISOString().split('T')[0] : ''); // Atualiza o valor do formulário
                                    }}
                                    initialFocus
                                    locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label htmlFor="hour">
                            Hora
                            </Label>
                            <Input
                            id="hour"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="00:00"
                            {...register("hour")}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">
                        Está dentro da dieta?
                        </Label>
                        <RadioGroup className="grid grid-cols-2">
                            <div onClick={handleClick(true)} className={`flex items-center justify-center space-x-2 py-4 rounded-md ${isOnDiet === null? 'bg-custom-gray-100 dark:bg-custom-gray-500' : isOnDiet? 'bg-custom-green-200 dark:bg-custom-green-300' : 'bg-custom-gray-100 dark:bg-custom-gray-500'}`}>
                                <input
                                    type="radio"
                                    className="hidden"
                                    value="true"
                                    checked={isOnDiet === true}
                                    {...register('is_on_diet')}
                                />
                                <div className="rounded-full w-3 h-3 bg-custom-green-400 dark:bg-custom-green-600 !m-0"></div>
                                <Label htmlFor="r1">Sim</Label>
                            </div>
                            <div onClick={handleClick(false)} className={`flex items-center justify-center space-x-2 py-4 rounded-md  ${isOnDiet === null? 'bg-custom-gray-100 dark:bg-custom-gray-500' : !isOnDiet? 'bg-custom-red-100 dark:bg-custom-red-400' : 'bg-custom-gray-100 dark:bg-custom-gray-500'}`}>
                                <input
                                    type="radio"
                                    className="hidden"
                                    value="false"
                                    checked={isOnDiet === false}
                                    {...register('is_on_diet')}
                                />
                                <div className="rounded-full w-3 h-3 bg-custom-red-500 dark:bg-custom-red-600 !m-0"></div>
                                <Label htmlFor="r2">Não</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <Button className="bg-custom-gray-500 dark:bg-custom-gray-100" type="submit">Cadastrar refeição</Button>
                </div>
            </form>
        </DialogContent>
    )
}