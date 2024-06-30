import { api } from "@/lib/api";
import { RoleEnum } from "@/models/enum/role-enum";

const prefix = "auth";

export async function register(
  email: string,
  password: string,
  role: RoleEnum
) {
  return api<{ token: string }>(`${prefix}/register`, "POST", {
    email,
    password,
    role,
  });
}

export async function login(email: string, password: string) {
  return api<{ accessToken: string }>(`${prefix}/login`, "POST", {
    email,
    password,
  });
}

export async function refreshToken() {
  return api<{ accessToken: string }>(`${prefix}/refresh-token`, "POST");
}

export async function getUserProfile() {
  return api(`${prefix}/profile`, "GET");
}

export default {
  register,
  login,
  refreshToken,
  getUserProfile,
};
