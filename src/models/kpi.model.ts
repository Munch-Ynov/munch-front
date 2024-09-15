import { FavoriteWithRestaurant } from "./favorite.model";
import {
  Reservation,
  ReservationWithRestaurant,
  ReservationWithUser,
} from "./reservation.model";
import { Restaurant } from "./restaurant.model";

export type UserKPIResponse = {
  lastReservations: ReservationWithRestaurant[];
  futureReservations: ReservationWithRestaurant[];
  favoriteRestaurants: FavoriteWithRestaurant[];
  numberOfReservations: number | null;
  numberOfFavoriteRestaurants: number | null;
  distinctRestaurants: number | null;
};

export type RestaurantKPIResponse = {
  confirmedReservations: number | null;
  distinctUsers: number;
  futureReservations: ReservationWithUser[];
};
