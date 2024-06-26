export interface RestaurateurProfile {
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
