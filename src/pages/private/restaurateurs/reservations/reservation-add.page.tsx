import { ExternalReservationForm } from "@/components/reservation/reservation-form";
import reservationApi from "@/lib/api/reservation.api";
import type { RestaurateurProfile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { toast } from "sonner";

const AddReservation = () => {
  const [user] = useAtom<RestaurateurProfile | undefined>(userAtom);

  if (!user?.restaurants?.length) throw new Error('Restaurant not found');


  const onSubmit = async (values: {
    name: string;
    nb_people: string;
    date: Date;
    time: string;
  }) => {
    const dateTime = new Date(values.date);
    dateTime.setHours(Number(values.time.split(":")[0]));
    dateTime.setMinutes(Number(values.time.split(":")[1]));
    const reservation = {
      restaurantId: user?.restaurants[0].id,
      date: dateTime,
      nb_people: Number(values.nb_people),
      name: values.name,
    }
    reservationApi.createReservation(reservation).then(() => {
      toast.success("Votre réservation a été enregistrée avec succès");
    })
  }


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
      <h1 className="text-2xl font-semibold">Ajouter une réservation</h1>
      <ExternalReservationForm onSubmit={onSubmit} />
    </main >
  );
}

export default AddReservation;
