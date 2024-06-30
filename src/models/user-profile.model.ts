import { Auth } from "./auth.model";

export interface UserProfile extends Auth {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
  banner?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
