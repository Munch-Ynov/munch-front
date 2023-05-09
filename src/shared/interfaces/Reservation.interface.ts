import type { Restaurant } from "./Restaurant.interface";
import type { User } from "./User.interface";

export interface Reservation {
  id: number;
  user: User;
  userId: number;
  restaurant: Restaurant;
  restaurantId: number;
  date: Date;
  nb_people: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
}
