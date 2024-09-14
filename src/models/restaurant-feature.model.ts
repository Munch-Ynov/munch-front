import { Category } from "./category.model";
export interface RestaurantFeature {
  id: string;
  name: string;
  icon?: string;
  categoryId: string;
}

export interface RestaurantFeatureWithCategory extends RestaurantFeature {
  category: Category;
}
