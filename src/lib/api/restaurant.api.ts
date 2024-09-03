import { api, type ErrorMessage } from "@/lib/api/api";
import type { Pagination } from "@/models/pagination.model";
import type { Restaurant } from "@/models/restaurant.model";

const prefix = "restaurant";

export async function createRestaurant(restaurant: Restaurant) {
  return api<Restaurant>({ url: prefix, method: "POST", body: restaurant });
}

export async function updateRestaurant(restaurant: Restaurant) {
  return api<Restaurant>({ url: prefix, method: "PUT", body: restaurant });
}

export async function getAllRestaurants(
  params: {
    page?: number;
    limit?: number;
    name?: string;
  } = {
      page: 0,
      limit: 10,
    }
) {
  return api<Pagination<Restaurant>>({
    url: prefix,
    method: "GET",
    params,
  });
}


export async function getRestaurantById(id: string) {
  return api<Restaurant>({
    url: `${prefix}/${id}`,
    method: "GET",
  });
}

export async function getRestaurantByOwner(restaurateurId: string) {
  return api<Restaurant | ErrorMessage>(
    {
      url: `${prefix}/owner/${restaurateurId}`,
      method: "GET",
    }
  );
}

export async function deleteRestaurant(id: string) {
  return api<Restaurant>(
    {
      url: `${prefix}/${id}`,
      method: "DELETE",
    }
  );
}

export default {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByOwner,
  deleteRestaurant,
};
