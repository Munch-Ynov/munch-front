import type { PriceCategoryEnum } from "./enum/price-category.enum";
import { RestaurantFeature } from "./restaurant-feature.model";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  description: string;
  price: PriceCategoryEnum;
  n_siret: string;
  phone: string;
  code_postal: string;
  city: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface RestaurantWithFeatures extends Restaurant {
  features: RestaurantFeature[];
}
