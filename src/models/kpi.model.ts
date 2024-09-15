import { FavoriteWithRestaurant } from "./favorite.model";
import { ReservationWithRestaurant } from "./reservation.model";
import { Restaurant } from "./restaurant.model";

export type UserKPIResponse = {
  lastReservations: ReservationWithRestaurant[];
  futureReservations: ReservationWithRestaurant[];
  favoriteRestaurants: FavoriteWithRestaurant[];
  numberOfReservations: number | null;
  numberOfFavoriteRestaurants: number | null;
  distinctRestaurants: number | null;
};
