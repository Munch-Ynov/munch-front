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
  pagination: { page?: number; limit?: number } = { page: 0, limit: 10 },
  filters: {
    past?: boolean;
    upcoming?: boolean;
  } = {}
) {
  return api<Pagination<Reservation>>({
    url: `${prefix}/user/${userId}`,
    method: "GET",
    params: {
      ...pagination,
      ...filters,
    }
  });
}

export async function getReservationByRestaurant(
  restaurantId: string,
  pagination: { page?: number; limit?: number } = { page: 0, limit: 10 },
  filters: {
    past?: boolean;
    upcoming?: boolean;
    available?: boolean;
  } = {}
) {
  return api<Pagination<Reservation>>({
    url: `${prefix}/restaurant/${restaurantId}`,
    method: "GET",
    params: {
      ...pagination,
      ...filters,
    }
  });
}

export async function updateReservation(reservation: Partial<Restaurant>) {
  return api({
    url: prefix,
    method: "PATCH",
    body: reservation,
  });
}

export async function cancelReservation(id: string) {
  return api({
    url: `${prefix}/${id}`,
    method: "PATCH",
    body: { status: "CANCELED" },
  });
}

// accept a reservation
export async function acceptReservation(id: string) {
  return api({
    url: `${prefix}/${id}`,
    method: "PATCH",
    body: { status: "ACCEPTED" },
  });
}

// reject a reservation
export async function rejectReservation(id: string) {
  return api({
    url: `${prefix}/${id}`,
    method: "PATCH",
    body: { status: "REFUSED" },
  });
}

export async function getUpcomingReservationsForRestaurant(
  restaurantId: string
) {
  return api<Pagination<Reservation>>({
    url: `${prefix}/restaurant/${restaurantId}/upcoming`,
    method: "GET",
  });
}

export default {
  createReservation,
  getReservationById,
  getReservationByUser,
  getReservationByRestaurant,
  updateReservation,
  cancelReservation,
  acceptReservation,
  rejectReservation,
  getUpcomingReservationsForRestaurant,
}
