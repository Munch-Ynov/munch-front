import { api, ErrorMessage } from "@/lib/api/api";
import type { RoleEnum } from "@/models/enum/role-enum";
import type { Profile, ProfileCreate } from "@/models/profile.model";

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
  }>({
    url: `${prefix}/register`,
    method: "POST",
    body: {
      email,
      password,
      role,
      profile,
    },
  });
}

export async function login(email: string, password: string) {
  return api<{ accessToken: string; user: Profile }>({
    url: `${prefix}/login`,
    method: "POST",
    body: {
      email,
      password,
    },
  });
}

export async function refreshToken() {
  return api<{ accessToken: string }>({
    url: `${prefix}/refresh-token`,
    method: "POST",
  });
}

export async function logout() {
  return api({
    url: `${prefix}/logout`,
    method: "POST",
  });
}

export async function getUserProfile() {
  return api<Profile>({
    url: `${prefix}/profile`,
    method: "GET",
  });
}

export default {
  register,
  login,
  refreshToken,
  getUserProfile,
  logout,
};
