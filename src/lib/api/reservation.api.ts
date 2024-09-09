import { api } from "@/lib/api/api";
import type { Pagination } from "@/models/pagination.model";
import type { Reservation } from "@/models/reservation.model";
import type { Restaurant } from "@/models/restaurant.model";

const prefix = "reservation";

export async function createReservation(reservation: Partial<Reservation>) {
  return api({
    url: prefix,
    method: "POST",
    body: reservation,
  });
}


export async function getReservationById(id: string) {
  return api<Reservation>({
    url: `${prefix}/${id}`,
    method: "GET",
  });
}

export async function getReservationByUser(
  userId: string,
  pagination: { page?: number; limit?: number } = { page: 0, limit: 10 }
) {
  return api<Pagination<Reservation>>({
    url: `${prefix}/user/${userId}`,
    method: "GET",
    params: pagination,
  });
}

export async function getReservationByRestaurant(
  restaurantId: string,
  pagination: { page?: number; limit?: number } = { page: 0, limit: 10 }
) {
  return api<Pagination<Reservation>>({
    url: `${prefix}/restaurant/${restaurantId}`,
    method: "GET",
    params: pagination,
  });
}

export async function updateReservation(reservation: Partial<Restaurant>) {
  return api({
    url: prefix,
    method: "PATCH",
    body: reservation,
  });
}

export async function deleteReservation(id: string) {
  return api({
    url: `${prefix}/${id}`,
    method: "DELETE",
  });
}

export default {
  createReservation,
  getReservationById,
  getReservationByUser,
  getReservationByRestaurant,
  updateReservation,
  deleteReservation,
}
