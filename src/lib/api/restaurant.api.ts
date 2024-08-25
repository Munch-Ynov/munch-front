import { api, ErrorMessage } from "@/lib/api/api";
import { Restaurant } from "@/models/restaurant.model";

const prefix = "restaurant";

export async function createRestaurant(restaurant: Restaurant) {
  return api<Restaurant>(prefix, "POST", restaurant);
}

export async function updateRestaurant(restaurant: Restaurant) {
  return api<Restaurant>(prefix, "PUT", restaurant);
}

export async function getAllRestaurants() {
  return api<Restaurant[]>(prefix, "GET");
}

export async function getRestaurantById(id: string) {
  return api<Restaurant>(`${prefix}/${id}`, "GET");
}

export async function getRestaurantByOwner(restaurateurId: string) {
  return api<Restaurant | ErrorMessage>(
    `${prefix}/owner/${restaurateurId}`,
    "GET"
  );
}

export async function deleteRestaurant(id: string) {
  return api<Restaurant>(`${prefix}/${id}`, "DELETE");
}

export default {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByOwner,
  deleteRestaurant,
};
