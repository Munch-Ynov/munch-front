import type { Restaurant } from "./Restaurant.interface";

export interface Feature {
  id: number;
  name: string;
  icon?: string;
  category: Category;
  restaurants: Restaurant[];
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  features: Feature[];
  createdAt: Date;
  updatedAt: Date;
}
