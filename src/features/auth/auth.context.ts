import { RoleEnum } from "@/models/enum/role-enum";
import { createContext } from "react";

export const AuthContext = createContext({
  register: async (email: string, password: string, role: RoleEnum) => {},
  login: async (email: string, password: string) => {},
  logout: () => {},
});
