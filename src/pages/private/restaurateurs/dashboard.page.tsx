import { CardKPI } from "@/components/kpi/card.kpi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import reservationApi from "@/lib/api/reservation.api";
import { cn } from "@/lib/utils";
import toFrenchStatus from "@/models/enum/reservation-status.enum";
import type { RestaurateurProfile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user] = useAtom<RestaurateurProfile | undefined>(userAtom);
  const restaurantId = user?.restaurants[0]?.id;

  if (!restaurantId) {
    navigate("/informations", { replace: true });
    toast.error("Vous n'avez pas encore de restaurant");
  }

  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  const { data: upcomingReservationsData } = useQuery({
    queryKey: ["reservations", "upcoming", restaurantId, lastUpdate],
    queryFn: async () =>
      await reservationApi.getUpcomingReservationsForRestaurant(
        restaurantId || ""
      ),
  });

  const upcomingReservations = upcomingReservationsData?.content || [];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <section className="">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardKPI
              title="Réservations Confirmées"
              value={128}
              icon="Calendar"
              subtitle="+14% par rapport à la semaine dernière"
            />
            <CardKPI
              title="Tables Disponibles"
              value={24}
              icon="ClipboardList"
              subtitle="6 tables réservées"
            />
            <CardKPI
              title="Capacité Totale"
              value={120}
              icon="Users"
              subtitle="Nombre de places assises dans tous les espaces"
            />
            <CardKPI
              title="Chiffre d'Affaires Moyen Quotidien"
              value={3240}
              icon="Info"
              subtitle="+5.2% par rapport au mois dernier"
            />
          </div>
        </section>

        <section className="">
          <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
            <CardHeader>
              <CardTitle>Réservations à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Nombre de personnes
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Heure d'arrivée
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Statut
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingReservations.map((reservation) => (
                    <TableRow
                      key={reservation.id}
                      onClick={() =>
                        navigate(`/reservations/${reservation.id}`)
                      }
                      className="cursor-pointer"
                    >
                      <TableCell className="hidden md:table-cell">
                        {format(reservation.date, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {reservation.nb_people}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(reservation.date, "HH:mm")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          // color change based on status
                          className={cn("text-xs", {
                            "bg-green-100 text-green-800":
                              reservation.status === "ACCEPTED",
                            "bg-red-100 text-red-800":
                              reservation.status === "CANCELED",
                            "bg-yellow-100 text-yellow-800":
                              reservation.status === "PENDING",
                            "bg-gray-100 text-gray-800":
                              reservation.status === "REFUSED",
                          })}
                        >
                          {toFrenchStatus(reservation.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};
