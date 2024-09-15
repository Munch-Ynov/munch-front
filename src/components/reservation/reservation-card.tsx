import { Badge } from "@/components/ui/badge";
import restaurantApi from "@/lib/api/restaurant.api";
import { cn } from "@/lib/utils";
import type { Reservation } from "@/models/reservation.model";
import type { Restaurant } from "@/models/restaurant.model";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import toFrenchStatus from "../../models/enum/reservation-status.enum";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

function ReservationCard({
  reservation,
  className,
  onClick,
  cancelReservation,
}: {
  reservation: Reservation;
  className?: string;
  onClick?: () => void;
  cancelReservation?: () => void;
}) {
  const { data } = useQuery({
    queryKey: ["restaurant", reservation.restaurantId],
    queryFn: async () =>
      await restaurantApi.getRestaurantById(reservation.restaurantId),
  });

  const restaurant = data as Restaurant;

  if (!restaurant) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={cn("container mx-auto", className)}
      onClick={onClick}>
      <Card key={reservation.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{restaurant.name}</span>
            <Badge
              variant="outline"
              // color change based on status
              className={cn("text-xs", {
                "bg-green-100 text-green-800":
                  reservation.status === "ACCEPTED",
                "bg-red-100 text-red-800": reservation.status === "CANCELED",
                "bg-yellow-100 text-yellow-800":
                  reservation.status === "PENDING",
                "bg-gray-100 text-gray-800": reservation.status === "REFUSED",
              })}
            >
              {toFrenchStatus(reservation.status)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mt-2">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{format(new Date(reservation.date), "dd/MM/yyyy")}</span>
          </div>
          <div className="flex items-center mt-2">
            <ClockIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{format(new Date(reservation.date), "HH:mm")}</span>
          </div>
          <div className="flex items-center mt-2">
            <UsersIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>
              {reservation.nb_people}{" "}
              {reservation.nb_people > 1 ? "personnes" : "personne"}
            </span>
          </div>
          {
            cancelReservation && reservation.status === "PENDING" &&
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelReservation?.();
                }}
              >
                Annuler
              </Button>
            </div>
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default ReservationCard;
