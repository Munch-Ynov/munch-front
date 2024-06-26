import { api } from "@/lib/api";
import { RoleEnum } from "@/models/enum/role-enum";

export async function register(
  email: string,
  password: string,
  role: RoleEnum
) {
  return api<{ token: string }>("/register", "POST", {
    email,
    password,
    role,
  });
}

export async function login(email: string, password: string) {
  return api<{ token: string }>("/login", "POST", { email, password });
}

export default {
  register,
  login,
};
