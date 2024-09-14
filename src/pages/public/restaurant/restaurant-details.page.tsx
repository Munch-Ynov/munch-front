import type { ErrorMessage } from "@/lib/api/api";
import reservationApi from "@/lib/api/reservation.api";
import restaurantApi from "@/lib/api/restaurant.api";
import type { Restaurant } from "@/models/restaurant.model";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import type { Profile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { toast } from "sonner";
import ReservationForm from "@/components/reservation/reservation-form";
import { Loader } from "@/components/ui/loader";
import { Clock, Heart, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";
import usePriceSymbol from "@/hooks/usePrice";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import api from "@/lib/api/restaurant.api";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [user] = useAtom<Profile>(userAtom);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () =>
      id
        ? await restaurantApi.getRestaurantById(id)
        : {
            message: "Restaurant not found",
            error: "Not Found",
            statusCode: 404,
          },
  });

  const restaurant = data as Restaurant;

  const onSubmit = async (values: {
    date: Date;
    time: string;
    nb_people: string;
  }) => {
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer une réservation");
      return;
    }

    const dateTime = new Date(values.date);
    dateTime.setHours(Number(values.time.split(":")[0]));
    dateTime.setMinutes(Number(values.time.split(":")[1]));

    const reservation = {
      restaurantId: restaurant.id,
      date: dateTime,
      nb_people: Number(values.nb_people),
      userId: user?.id,
      name: user?.name,
    };

    reservationApi.createReservation(reservation).then(() => {
      toast.success("Votre réservation a été enregistrée avec succès");
    });
  };

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
  };

  // TODO
  const isClosed = (date: Date) => date.getDay() === 2;

  const [updatedAt, setUpdatedAt] = useState(new Date());

  const { data: favData } = useQuery({
    queryKey: ["favorites", user.id, updatedAt],
    queryFn: async () =>
      await api.getFavoritesRestaurants(user.id, {
        size: 1000,
      }),
  });

  const isFavorite = favData?.content?.some((fav) => fav.id === restaurant.id);

  const toggleFavorite = async (restaurantId: string) => {
    if (isFavorite) {
      await api
        .removeFavoriteRestaurant(user?.id, restaurantId)
        .then(() => {
          toast.success("Restaurant retiré des favoris");
        })
        .catch(() => {
          toast.error(
            "Erreur lors de la suppression du restaurant des favoris"
          );
        });
    } else {
      await api
        .addFavoriteRestaurant(user?.id, restaurantId)
        .then(() => {
          toast.success("Restaurant ajouté aux favoris");
        })
        .catch(() => {
          toast.error("Erreur lors de l'ajout du restaurant aux favoris");
        });
    }
    setUpdatedAt(new Date());
  };

  if (isLoading) return <Loader />;
  if (!data || (data as ErrorMessage).statusCode)
    return <h1>Le restaurant n'existe pas</h1>;
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-12">
      <div className="relative">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-600 mb-4">{restaurant.address}</p>
          </div>
          <div className="inline-flex items-center gap-4">
            <a href="#reservation">
              <Button size="sm">
                <Clock className="h-5 w-5 mr-2" />
                <span>Réserver une table</span>
              </Button>
            </a>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite?.(restaurant.id);
              }}
              variant="ghost"
              size="icon"
              className="rounded-full shadow-md"
            >
              <HeartIcon
                className={cn(
                  "h-6 w-6",
                  isFavorite ? "text-red-500 fill-current" : "text-gray-400"
                )}
              />
            </Button>
          </div>
        </div>

        <div className="my-8 w-3/4 mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mb-8"
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                <AdvancedImage
                  cldImg={cld.image(restaurant.main_picture)}
                  alt="main_picture"
                  className="w-full h-[20vh] object-cover rounded-md"
                />
              </CarouselItem>
              {restaurant.pictures.map((pic, index) => (
                <CarouselItem className="md:basis-1/3 lg:basis-1/4" key={index}>
                  <AdvancedImage
                    key={index}
                    cldImg={cld.image(pic)}
                    alt={`Food ${index + 1}`}
                    className="w-full h-[20vh] object-cover rounded-md"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex items-baseline mb-1">
          <span>Fourchette de prix : </span>
          <Badge variant="outline" className="text-muted-foreground mx-2">
            {usePriceSymbol(restaurant.price)}
          </Badge>
        </div>
        <Badge className="bg-indigo-200 text-indigo-600 mb-8">
          Cuisine d'Amérique du Sud
        </Badge>

        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 mb-8">{restaurant.description}</p>

        <section id="reservation" className="py-12 md:py-24 bg-muted">
          <div className="container">
            <div className="max-w-md mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center">
                Réserver une table
              </h2>
              <ReservationForm
                restaurant={restaurant}
                isClosed={isClosed}
                timespots={timespots}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantDetail;
