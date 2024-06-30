import { Auth } from "./auth.model";

export interface RestaurateurProfile extends Auth {
  id: string;
  authId: string;
  avatar?: string;
  banner?: string;
  name: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
