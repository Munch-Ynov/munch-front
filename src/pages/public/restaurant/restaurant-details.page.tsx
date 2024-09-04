import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ErrorMessage } from "@/lib/api/api";
import restaurantApi from "@/lib/api/restaurant.api";
import reservationApi from "@/lib/api/reservation.api";
import type { Restaurant } from "@/models/restaurant.model";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon, ClockIcon, Loader } from "lucide-react";
import { useParams } from "react-router-dom";

import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { fr } from "date-fns/locale";
import { FormProvider, useForm } from "react-hook-form";
import { useConfirm } from "@/hooks/useConfirm";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth.store";
import type { Profile } from "@/models/profile.model";
import { toast } from "sonner";

const RestaurantDetail = () => {
  const { id } = useParams();

  const { data, loading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => id ? await restaurantApi.getRestaurantById(id) : {
      message: "Restaurant not found",
      error: "Not Found",
      statusCode: 404
    }
  });


  const restaurant = data as Restaurant;

  const { confirm } = useConfirm();

  // TODO
  const timespots: { [key: string]: boolean } = {
    "12:00": true,
    "12:30": true,
    "13:00": false,
    "13:30": true,
    "19:00": true,
    "19:30": true,
    "20:00": true,
    "20:30": true,
  }

  // TODO
  const isClosed = (date: Date) => date.getDay() === 2;

  const [user] = useAtom<Profile | undefined>(userAtom);

  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: "",
      nb_people: '',
      userId: user?.id
    }
  });

  const onSubmit = async (values: {
    date: Date;
    time: string;
    nb_people: string;
  }) => {
    const dateTime = new Date(values.date);
    dateTime.setHours(Number(values.time.split(":")[0]));
    dateTime.setMinutes(Number(values.time.split(":")[1]));

    const reservation = {
      restaurantId: restaurant.id,
      date: dateTime,
      nb_people: Number(values.nb_people),
      userId: user?.id
    }

    reservationApi.createReservation(reservation).then(() => {
      toast.success("Votre réservation a été enregistrée avec succès");
    })
  }



  if (loading) return <Loader />
  if (!data || (data as ErrorMessage).statusCode) return <h1>Le restaurant n'existe pas</h1>
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[500px] overflow-hidden">
        <img
          src={restaurant.image ?? `https://picsum.photos/seed/${restaurant.id}/1920/1080`}
          alt="Restaurant Interior"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center space-y-4 text-white">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-lg">{restaurant.description}</p>
            <a
              href="#reservation"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Réserver une table
            </a>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 bg-muted">
      </section>
      <section id="reservation" className="py-12 md:py-24">
        <div className="container">
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center">
              Réserver une table
            </h2>
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
              <Button onClick={() => confirm("Êtes-vous sûr de vouloir réserver ?").then((confirmed) => {
                confirmed && form.handleSubmit(onSubmit)();
              })} type="button" className="w-full">
                Réserver
              </Button>
            </FormProvider>
          </div>
        </div >
      </section >
      <section className="py-12 md:py-24 bg-muted">
      </section>
    </div >
  );
}

export default RestaurantDetail;


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


