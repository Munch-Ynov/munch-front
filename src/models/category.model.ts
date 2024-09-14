import { RestaurantFeature } from "./restaurant-feature.model";

export interface Category {
  id: string;
  name: string;
}

export interface CategoryWithFeatures extends Category {
  feature: RestaurantFeature[];
}
