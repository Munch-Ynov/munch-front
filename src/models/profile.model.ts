import { Auth } from "./auth.model";

export interface UserProfile extends Auth {
  id: string;
  authId: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface UserProfileCreate {
  name: string;
  phone?: string;
  avatar?: string;
  banner?: string;
}

export interface RestaurateurProfile extends Auth {
  id: string;
  authId: string;
  name: string;
  phone?: string;
  avatar?: string;
  restaurants: {
    id: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface RestaurateurProfileCreate {
  name: string;
  phone?: string;
  avatar?: string;
  restaurantId?: string;
}

export type Profile = UserProfile | RestaurateurProfile;

export type ProfileCreate = UserProfileCreate | RestaurateurProfileCreate;
