import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Group,
  Heart,
  Star,
  User2,
  UserCircle2,
  Users,
} from "lucide-react";
import { CardKPI } from "@/components/kpi/card.kpi";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth.store";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";
import { useQuery } from "@tanstack/react-query";
import apiKpi from "@/lib/api/kpi.api";
import RestaurantCard from "@/components/restaurant/restaurant-card";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function DashboardPage() {
  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState(user);
  const navigate = useNavigate();

  const { data: kpis, isLoading } = useQuery({
    queryKey: ["kpis", user.id],
    queryFn: async () => await apiKpi.getUserKPI(user.id),
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {profile.avatar ? (
            <AdvancedImage
              cldImg={cld.image(profile.avatar)}
              className="rounded-full h-16 w-16 object-cover"
            />
          ) : (
            <UserCircle2 className="h-16 w-16 text-primary" />
          )}
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <CardKPI
            icon="Utensils"
            title="Réservations totales"
            value={kpis?.numberOfReservations || 0}
            isLoading={isLoading}
          />
          <CardKPI
            icon="Star"
            title="Restaurants favoris"
            value={kpis?.numberOfFavoriteRestaurants || 0}
            isLoading={isLoading}
          />
          <CardKPI
            icon="MapPin"
            title="Restaurants visités"
            value={kpis?.distinctRestaurants || 0}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique</CardTitle>
              <CardDescription>Vos dernières réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {kpis?.lastReservations.map((reservation, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">
                        {reservation.restaurant.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reservation.date).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{reservation.nb_people} personnes</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Réservations à venir</CardTitle>
              <CardDescription>Vos prochaines réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {kpis?.futureReservations.map((reservation, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">
                        {reservation.restaurant.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reservation.date).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{reservation.nb_people} personnes</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Restaurants favoris</CardTitle>
              <CardDescription>Vos restaurants préférés</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="mx-10">
                <CarouselContent>
                  {kpis?.favoriteRestaurants.map((favorite, index) => (
                    <CarouselItem
                      key={favorite.restaurantId}
                      className="md:basis-1/3"
                    >
                      <RestaurantCard
                        restaurant={favorite.restaurant}
                        isFavorite
                        onClick={() =>
                          navigate(`/restaurants/${favorite.restaurantId}`)
                        }
                        className="mb-4 "
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
              </Carousel>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
