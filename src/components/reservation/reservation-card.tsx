import type { Reservation } from "@/models/reservation.model";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import restaurantApi from '@/lib/api/restaurant.api';
import { useQuery } from "@tanstack/react-query";
import toFrenchStatus from '../../models/enum/reservation-status.enum';
import type { Restaurant } from "@/models/restaurant.model";

function ReservationCard({
  reservation,
  onClick,
  className,
}: {
  reservation: Reservation;
  onClick?: () => void;
  className?: string;
}) {


  const { data } = useQuery({
    queryKey: ["restaurant", reservation.restaurantId],
    queryFn: async () => await restaurantApi.getRestaurantById(reservation.restaurantId),
  });

  const restaurant = data as Restaurant;

  if (!restaurant) return null;

  return (
    <div
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      onClick={onClick}
      className={cn(onClick ? "cursor-pointer hover:bg-gray-100" : '', 'flex row-auto', 'rounded-sm', className)}>
      <div className="flex-1 justify-between">
        {restaurant.name}
      </div>
      <div className="flex-1 justify-between">
        <p>{format(new Date(reservation.date), "dd/MM/yyyy")}</p>
        <p>{format(new Date(reservation.date), "HH:mm")}</p>
      </div>
      <div className="flex-1 justify-between">
        <p>{reservation.nb_people} personnes</p>
        <p>{toFrenchStatus(reservation.status)}</p>
      </div>
    </div >
  );
}

export default ReservationCard;
