import type { RestaurateurProfile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import kpiApi from "@/lib/api/kpi.api";
import { CardKPI } from "@/components/kpi/card.kpi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import toFrenchStatus from "@/models/enum/reservation-status.enum";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user] = useAtom<RestaurateurProfile | undefined>(userAtom);
  const restaurantId = user?.restaurants[0]?.id;

  if (!restaurantId) {
    navigate("/informations", { replace: true });
    toast.error("Vous n'avez pas encore de restaurant");
  }

  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  const { data: kpiData, isLoading } = useQuery({
    queryKey: ["kpiRestaurant", restaurantId],
    queryFn: async () => await kpiApi.getRestaurantKPI(restaurantId!),
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <section className="">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardKPI
              title="Réservations Confirmées"
              value={kpiData?.confirmedReservations || 0}
              icon="Calendar"
              isLoading={isLoading}
            />
            <CardKPI
              title="Utilisateurs uniques"
              value={kpiData?.distinctUsers || 0}
              icon="Users"
              isLoading={isLoading}
            />
            <CardKPI
              title="Tables Disponibles"
              value={43}
              icon="ClipboardList"
              isLoading={isLoading}
            />
            <CardKPI
              title="Capacité Totale"
              value={120}
              icon="Users"
              isLoading={isLoading}
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
                  {kpiData?.futureReservations.map((reservation) => (
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
