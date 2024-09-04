import { api } from "@/lib/api/api";
import type { Reservation } from "@/models/reservation.model";
import type { Restaurant } from "@/models/restaurant.model";

const prefix = "reservation";

export async function createReservation(reservation: Reservation) {
  return api({
    url: prefix,
    method: "POST",
    body: reservation,
  });
}

export async function getReservations() {
  return api({
    url: prefix,
    method: "GET",
  });
}

export async function getReservationById(id: string) {
  return api({
    url: `${prefix}/${id}`,
    method: "GET",
  });
}

export async function getReservationByUser(userId: string) {
  return api({
    url: `${prefix}/user/${userId}`,
    method: "GET",
  });
}

export async function getReservationByRestaurant(restaurantId: string) {
  return api({
    url: `${prefix}/restaurant/${restaurantId}`,
    method: "GET",
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

export default {};
