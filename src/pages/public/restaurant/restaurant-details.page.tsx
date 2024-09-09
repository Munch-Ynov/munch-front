import type { ErrorMessage } from "@/lib/api/api";
import reservationApi from "@/lib/api/reservation.api";
import restaurantApi from "@/lib/api/restaurant.api";
import type { Restaurant } from "@/models/restaurant.model";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";


import { useConfirm } from "@/hooks/useConfirm";
import type { Profile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { toast } from "sonner";
import ReservationForm from "@/components/reservation/reservation-form";

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

  const [user] = useAtom<Profile | undefined>(userAtom);


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

      </section >
      <section className="py-12 md:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center">Réserver une table</h2>
          <ReservationForm
            restaurant={restaurant}
            isClosed={isClosed}
            timespots={timespots}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    </div >
  );
}

export default RestaurantDetail;

