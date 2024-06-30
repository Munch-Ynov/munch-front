import { Auth } from "@/models/auth.model";
import { RoleEnum } from "@/models/enum/role-enum";
import { RestaurateurProfile } from "@/models/restaurateur-profile";
import { UserProfile } from "@/models/user-profile.model";
import { createContext } from "react";

export const AuthContext = createContext({
  register: async (email: string, password: string, role: RoleEnum) => {},
  login: async (email: string, password: string) => {},
  logout: () => {},
});
