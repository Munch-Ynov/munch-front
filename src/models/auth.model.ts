import { RoleEnum } from "./enum/role-enum";

export interface Auth {
  id: string;
  email: string;
  password: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
