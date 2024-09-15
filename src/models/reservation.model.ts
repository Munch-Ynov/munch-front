import { ReservationStatusEnum } from "./enum/reservation-status.enum";
import { UserProfile } from "./profile.model";
import { Restaurant } from "./restaurant.model";

export interface Reservation {
  id: string;
  date: Date;
  nb_people: number;
  status: ReservationStatusEnum;
  userId?: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface ReservationWithRestaurant extends Reservation {
  restaurant: Restaurant;
}

export interface ReservationWithUser extends Reservation {
  user: UserProfile["name"];
}
