import type { Favorite } from "./Favorite.interface";
import type { Reservation } from "./Reservation.interface";
import type { Restaurant } from "./Restaurant.interface";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  restaurant?: Restaurant;
  admin: boolean;
  favorites: Favorite[];
  reservations: Reservation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserForm extends Partial<User> {}

export interface LoginForm {
  password: string;
  email: string;
}
