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
import { Input } from "../ui/input";
import { useState } from "react";


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
  onClose?: () => void;
  name: string;
  label: string;
  value?: Date;
};

export function CalendarPopUp({
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



//  form to add an external reservation (by a restaurateur)
// user need to enter :
// - the date of the reservation
// - the time of the reservation
// - the number of people
// - the name of the customer

export interface ExternalReservationFormProps {
  onSubmit: (values: {
    date: Date;
    time: string;
    nb_people: string;
    name: string;
  }) => void;
}

export function ExternalReservationForm({
  onSubmit,
}: ExternalReservationFormProps) {
  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: "",
      nb_people: "",
      name: "",
    },
  });

  return (
    <FormProvider {...form}>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nom du client</FormLabel>
              <Input
                {...field}
                type="text"
                className="input"
                placeholder="Nom du client"
              />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <CalendarPopUp
          control={form.control}
          name="date"
          mode="single"
          id="date"
          label="Selectionner une date"
          fromDate={new Date()}
          locale={fr}
          toDate={new Date(new Date(new Date().setMonth(new Date().getMonth() + 3)).setDate(0))}
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
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="12:30">12:30</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="13:30">13:30</SelectItem>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="19:30">19:30</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                  <SelectItem value="20:30">20:30</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="nb_people"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nombre de personnes</FormLabel>
              <Input
                maxLength={2}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 2);
                }}
                {...field}
                type="number"
                className="input"
                placeholder="Nombre de personnes"
              />
            </FormItem>

          )}
        />



      </div>

      <Button
        onClick={form.handleSubmit(onSubmit)}
        type="button"
        className="w-full"
      >
        Ajouter
      </Button>
    </FormProvider>
  );
}
