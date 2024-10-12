import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from "lucide-react";
import { MouseEvent, useState } from "react";

export function DialogDailyDiet(){
    const [date, setDate] = useState<Date>()

    const handleClick = (id: string) => (event: MouseEvent<HTMLDivElement>) => {
        const radioItem = document.getElementById(id) as HTMLInputElement;
        const clickedDiv = event.currentTarget as HTMLDivElement;
        const otherRadioId = id === 'r1' ? 'r2' : 'r1';
        const otherDiv = clickedDiv.parentElement?.querySelector(`[for="${otherRadioId}"]`)?.parentElement as HTMLDivElement;
        
        if (radioItem) {
          radioItem.click();
        }

        if(id === 'r1'){
            clickedDiv.classList.remove('bg-custom-gray-100')
            clickedDiv.classList.remove('dark:bg-custom-gray-500')
            clickedDiv.classList.add('bg-custom-green-200')
            clickedDiv.classList.add('dark:bg-custom-green-300')

            otherDiv.classList.remove('bg-custom-red-100')
            otherDiv.classList.remove('dark:bg-custom-red-400')
            otherDiv.classList.add('bg-custom-gray-100')
            otherDiv.classList.add('dark:bg-custom-gray-500')
        }
        else if(id === 'r2'){
            clickedDiv.classList.remove('bg-custom-gray-100')
            clickedDiv.classList.remove('dark:bg-custom-gray-500')
            clickedDiv.classList.add('bg-custom-red-100')
            clickedDiv.classList.add('dark:bg-custom-red-400')

            otherDiv.classList.remove('bg-custom-green-200')
            otherDiv.classList.remove('dark:bg-custom-green-300')
            otherDiv.classList.add('bg-custom-gray-100')
            otherDiv.classList.add('dark:bg-custom-gray-500')
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px] p-0">
            <DialogHeader className="bg-custom-gray-200 dark:bg-custom-gray-500 rounded-t-lg p-5">
                <DialogTitle className="text-center">Nova refeição</DialogTitle>
            </DialogHeader>
            <div className="px-5 pb-5">
                <div className="flex flex-col gap-3">
                    <div>
                        <Label htmlFor="name">
                        Nome
                        </Label>
                        <Input
                        id="name"
                        className="col-span-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">
                        Descrição
                        </Label>
                        <Textarea
                        id="description"
                        className="col-span-3 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <div>
                            <Label className="mb-1 block" htmlFor="description" >
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
                                    onSelect={setDate}
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
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">
                        Está dentro da dieta?
                        </Label>
                        <div>
                            <RadioGroup className="grid grid-cols-2">
                            <div onClick={handleClick('r1')} className="flex items-center justify-center space-x-2 py-4 rounded-md bg-custom-gray-100 dark:bg-custom-gray-500">
                                <RadioGroupItem className="hidden" value="true" id="r1" />
                                <div className="rounded-full w-3 h-3 bg-custom-green-400 dark:bg-custom-green-600 !m-0"></div>
                                <Label htmlFor="r1">Sim</Label>
                            </div>
                            <div onClick={handleClick('r2')} className="flex items-center justify-center space-x-2 py-4 rounded-md bg-custom-gray-100 dark:bg-custom-gray-500">
                                <RadioGroupItem className="hidden" value="false" id="r2" />
                                <div className="rounded-full w-3 h-3 bg-custom-red-500 dark:bg-custom-red-600 !m-0"></div>
                                <Label htmlFor="r2">Não</Label>
                            </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <Button className="bg-custom-gray-500 dark:bg-custom-gray-100" type="submit">Cadastrar refeição</Button>
                </div>
            </div>
        </DialogContent>
    )
}