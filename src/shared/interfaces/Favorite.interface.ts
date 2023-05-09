import type { Restaurant } from "./Restaurant.interface";
import type { User } from "./User.interface";

export interface Favorite {
  id: number;
  user: User;
  userId: number;
  restaurant: Restaurant;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}
