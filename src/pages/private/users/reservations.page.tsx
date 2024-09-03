import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from '@/components/ui/loader';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import reservationApi from "@/lib/api/reservation.api";
import type { Profile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { PlusCircle } from "lucide-react";
import { format } from "date-fns";

export const ReservationsPage = () => {

  const [user] = useAtom<Profile | undefined>(userAtom);

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", user?.id],
    queryFn: async () => user?.id ? reservationApi.getReservationByUser(user.id) : null,
  });

  if (isLoading) { return <Loader />; }

  if (!data) {
    return (
      <div>
        <h1>Aucune réservation trouvée</h1>
      </div>
    );
  }

  return (
    < main className="flex-1 items-start gap-4 md:gap-8 " >
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  Liste des Réservations
                  <Button className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Ajouter
                    </span>
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Vous trouverez ci-dessous la liste de toutes vos réservations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Restaurant</th>
                      <th>Nombre de personnes</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{format(new Date(reservation.date), "dd/MM/yyyy")}</td>
                        <td>{reservation.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main >
  );
}
