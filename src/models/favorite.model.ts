import { Restaurant } from "./restaurant.model";

export type Favorites = {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: Date;
};

export type FavoriteWithRestaurant = Favorites & {
  restaurant: Restaurant;
};
