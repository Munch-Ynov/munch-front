import { api, type ErrorMessage } from "@/lib/api/api";
import type { Pagination } from "@/models/pagination.model";
import type {
  Restaurant,
  RestaurantWithFeatures,
} from "@/models/restaurant.model";

const prefix = "restaurant";

export async function createRestaurant(restaurant: Omit<RestaurantWithFeatures, "id" | "createdAt" | "updatedAt">) {
  return api<Restaurant>({
    url: prefix,
    method: "POST",
    body: {
      ...restaurant,
      features: restaurant.features.map((f) => f.id),
    }
  });
}

export async function updateRestaurant(
  restaurant: Omit<RestaurantWithFeatures, "createdAt" | "updatedAt">
) {
  return api<Restaurant>({
    url: `${prefix}/${restaurant.id}`,
    method: "PATCH",
    body: {
      ...restaurant,
      features: restaurant.features.map((f) => f.id),
    }
  });
}

export async function getAllRestaurants(
  params: {
    page?: number;
    size?: number;
    name?: string;
    features?: string[];
  } = {
      page: 0,
      size: 10,
    }
) {
  return api<Pagination<Restaurant>>({
    url: prefix,
    method: "GET",
    params,
  });
}

export async function getFavoritesRestaurants(
  userId: string,
  params: {
    page?: number;
    size?: number;
  } = {
      page: 0,
      size: 10,
    }
) {
  return api<Pagination<Restaurant>>({
    url: `favorite/${userId}`,
    method: "GET",
    params,
  });
}

export async function addFavoriteRestaurant(
  userId: string,
  restaurantId: string
) {
  return api<ErrorMessage>({
    url: `favorite/${userId}/${restaurantId}`,
    method: "POST",
  });
}

export async function removeFavoriteRestaurant(
  userId: string,
  restaurantId: string
) {
  return api<ErrorMessage>({
    url: `favorite/${userId}/${restaurantId}`,
    method: "DELETE",
  });
}

export async function getRestaurantById(id: string) {
  return api<Restaurant>({
    url: `${prefix}/${id}`,
    method: "GET",
  });
}

export async function getRestaurantByOwner(restaurateurId: string) {
  return api<RestaurantWithFeatures>({
    url: `${prefix}/owner/${restaurateurId}`,
    method: "GET",
  });
}

export async function deleteRestaurant(id: string) {
  return api<Restaurant>({
    url: `${prefix}/${id}`,
    method: "DELETE",
  });
}

export default {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByOwner,
  deleteRestaurant,

  getFavoritesRestaurants,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
};
