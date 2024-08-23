import { RoleEnum } from "@/models/enum/role-enum";
import { ProfileCreate } from "@/models/profile.model";
import { createContext } from "react";

export const AuthContext = createContext({
  register: async (
    email: string,
    password: string,
    role: RoleEnum,
    profile: ProfileCreate
  ) => {},
  login: async (email: string, password: string) => {},
  logout: () => {},
});
