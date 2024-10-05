import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function DialogDailyDiet(){
    const [date, setDate] = useState<Date>()
    return (
        <DialogContent className="sm:max-w-[425px] p-0">
            <DialogHeader className="bg-custom-gray-500 dark:bg-custom-gray-200 rounded-t-lg p-5">
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
                        className="col-span-3"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">
                        Descrição
                        </Label>
                        <Textarea
                        id="description"
                        className="col-span-3 resize-none"
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
                                    {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
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
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">
                        Está dentro da dieta?
                        </Label>
                        <div>
                            <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="r1" />
                                <Label htmlFor="r1">Sim</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="r2" />
                                <Label htmlFor="r2">Não</Label>
                            </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <Button className="bg-custom-gray-200 dark:bg-custom-gray-600" type="submit">Cadastrar refeição</Button>
                </div>
            </div>
        </DialogContent>
    )
}