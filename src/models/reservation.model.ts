import { ReservationStatusEnum } from "./enum/reservation-status.enum";

export interface Reservation {
  id: string;
  date: Date;
  nb_people: number;
  status: ReservationStatusEnum;
  userId?: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}
