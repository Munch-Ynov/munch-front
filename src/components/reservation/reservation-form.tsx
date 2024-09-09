import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Restaurant } from "@/models/restaurant.model";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Profile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { fr } from "date-fns/locale";
import { useAtom } from "jotai";
import { FormProvider, useForm } from "react-hook-form";
import { useConfirm } from "@/hooks/useConfirm";


interface ReservationFormProps {
  restaurant: Restaurant;
  isClosed: (date: Date) => boolean;
  timespots: { [key: string]: boolean };
  onSubmit: (values: {
    date: Date;
    time: string;
    nb_people: string;
  }) => void;
}


function ReservationForm({
  isClosed,
  timespots,
  onSubmit,
}: ReservationFormProps) {
  const [user] = useAtom<Profile | undefined>(userAtom);

  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: "",
      nb_people: '',
      userId: user?.id
    }
  });

  const { confirm } = useConfirm();


  return (

    <FormProvider {...form} >

      <div className="grid grid-cols-2 gap-4">
        <CalendarPopUp
          control={form.control}
          name="date"
          mode="single"
          id="date"
          label="Selectionner une date"
          fromDate={new Date()}
          locale={fr}
          toDate={new Date(new Date(new Date().setMonth(new Date().getMonth() + 3)).setDate(0))}
          modifiers={{
            we: (date) => date.getDay() === 0 || date.getDay() === 6,
            closed: isClosed
          }}
          modifiersClassNames={{
            // we: "bg-primary/10 text-primary",
            closed: "bg-red-500/10 text-red-500",
          }}
          disabled={isClosed}
        >
        </CalendarPopUp>

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Heure</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Séléctionner l'heure" />
                  <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(timespots).map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={!timespots[time]}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="nb_people"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de personnes</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Séléctionner le nombre de personnes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 personne</SelectItem>
                  <SelectItem value="2">2 personnes</SelectItem>
                  <SelectItem value="3">3 personnes</SelectItem>
                  <SelectItem value="4">4 personnes</SelectItem>
                  <SelectItem value="5">5 personnes</SelectItem>
                  <SelectItem value="6">6 personnes</SelectItem>
                  <SelectItem value="7">7 personnes</SelectItem>
                  <SelectItem value="8+">Plus de 8 personnes</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <Button onClick={() => confirm({ content: "Êtes-vous sûr de vouloir réserver ?" }).then((confirmed) => {
        confirmed && form.handleSubmit(onSubmit)();
      })} type="button" className="w-full">
        Réserver
      </Button>
    </FormProvider>

  )
}

export default ReservationForm;




// calendar as pop up modal

type CalendarPopUpProps = CalendarProps & {
  control: any;
  onClose: () => void;
  name: string;
  label: string;
  value?: Date;
};

function CalendarPopUp({
  control,
  name,
  ...props
}: CalendarPopUpProps
) {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP", { locale: props.locale })
                  ) : (
                    <span>
                      {props.label}
                    </span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                {...props}
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />

  )
}


