import { PriceCategoryEnum } from "./enum/price-category.enum";

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
