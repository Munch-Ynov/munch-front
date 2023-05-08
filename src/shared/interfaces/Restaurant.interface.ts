import type { Feature } from ".";
import type { Favorite } from "./Favorite.interface";
import type { Reservation } from "./Reservation.interface";
import type { User } from "./User.interface";

export interface Restaurant {
  id: number;
  user?: User;
  userId?: number;
  name: string;
  address: string;
  description: string;
  price: Price;
  n_siret: string;
  phone: string;
  code_postal: string;
  city: string;
  email: string;
  features: Feature[];
  favorites: Favorite[];
  reservations: Reservation[];
  createdAt: Date;
  updatedAt: Date;
}

enum Price {
  ECO = "ECO",
  MODERATE = "MODERATE",
  EXPENSIVE = "EXPENSIVE",
  VERY_EXPENSIVE = "VERY_EXPENSIVE",
}
