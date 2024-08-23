import { api } from "@/lib/api/api";
import { RoleEnum } from "@/models/enum/role-enum";
import { Profile, ProfileCreate } from "@/models/profile.model";

const prefix = "auth";

export async function register(
  email: string,
  password: string,
  role: RoleEnum,
  profile: ProfileCreate
) {
  return api<{
    accessToken: string;
    user: Profile;
  }>(`${prefix}/register`, "POST", {
    email,
    password,
    role,
    profile,
  });
}

export async function login(email: string, password: string) {
  return api<{ accessToken: string; user: Profile }>(
    `${prefix}/login`,
    "POST",
    {
      email,
      password,
    }
  );
}

export async function refreshToken() {
  return api<{ accessToken: string }>(`${prefix}/refresh-token`, "POST");
}

export async function logout() {
  return api(`${prefix}/logout`, "POST");
}

export async function getUserProfile() {
  return api<Profile>(`${prefix}/profile`, "GET");
}

export default {
  register,
  login,
  refreshToken,
  getUserProfile,
  logout,
};
