export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
  banner?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
