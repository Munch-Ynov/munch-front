import { api } from "@/lib/api/api";

const prefix = "reservation";

export async function createReservation(reservation: any) {
  return api(prefix, "POST", reservation);
}

export async function getReservations() {
  return api(prefix, "GET");
}

export async function getReservationById(id: string) {
  return api(`${prefix}/${id}`, "GET");
}

export async function getReservationByUser(userId: string) {
  return api(`${prefix}/user/${userId}`, "GET");
}

export async function getReservationByRestaurant(restaurantId: string) {
  return api(`${prefix}/restaurant/${restaurantId}`, "GET");
}

export async function updateReservation(reservation: any) {
  return api(prefix, "PUT", reservation);
}

export async function deleteReservation(id: string) {
  return api(`${prefix}/${id}`, "DELETE");
}

export default {};
