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
import { CalendarDays, Star, UserCircle2 } from "lucide-react";
import { CardKPI } from "@/components/kpi/card.kpi";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth.store";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";

export default function DashboardPage() {
  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState(user);

  const reservationsPassees = [
    { restaurant: "Le Petit Bistro", date: "2024-07-15", personnes: 2 },
    { restaurant: "La Grande Table", date: "2024-06-30", personnes: 4 },
    { restaurant: "Chez Marie", date: "2024-06-10", personnes: 3 },
  ];

  const reservationsFutures = [
    { restaurant: "L'Étoile Filante", date: "2024-09-05", personnes: 2 },
    { restaurant: "Le Jardin Secret", date: "2024-09-20", personnes: 6 },
  ];

  const restaurantsFavoris = [
    "Le Petit Bistro",
    "L'Étoile Filante",
    "La Brasserie du Coin",
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Updated profile:", profile);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setProfile((prev: any) => ({ ...prev, role: value }));
  };

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
          <CardKPI icon="Utensils" title="Réservations totales" value={5} />
          <CardKPI icon="Star" title="Restaurants favoris" value={3} />
          <CardKPI icon="Calendar" title="Prochaines réservations" value={2} />
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
              <CardTitle>Historique des réservations</CardTitle>
              <CardDescription>Vos réservations passées</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {reservationsPassees.map((reservation, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{reservation.restaurant}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{reservation.personnes} personnes</span>
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
                {reservationsFutures.map((reservation, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{reservation.restaurant}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{reservation.personnes} personnes</span>
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
              <ul className="space-y-2">
                {restaurantsFavoris.map((restaurant, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-400" />
                    <span>{restaurant}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
