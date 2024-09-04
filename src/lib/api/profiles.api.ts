import { api } from "@/lib/api/api";
import type { RoleEnum } from "@/models/enum/role-enum";
import type { Profile } from "@/models/profile.model";

const prefix = "profile";

export async function createProfile(profile: Profile) {
  return api<Profile>({
    url: prefix,
    method: "POST",
    body: profile,
  });
}

export async function updateProfile(profile: Partial<Profile>) {
  return api<Profile>({
    url: prefix,
    method: "PATCH",
    body: profile,
  });
}

export async function updateProfileToken(profile: Partial<Profile>) {
  return api<Profile>({
    url: `${prefix}/token`,
    method: "PATCH",
    body: profile,
  });
}

export async function getAllProfiles() {
  return api<Profile[]>({
    url: prefix,
    method: "GET",
  });
}

export async function getProfileById(id: string) {
  return api<Profile>({
    url: `${prefix}/${id}`,
    method: "GET",
  });
}

export async function getProfilesByRole(role: RoleEnum) {
  return api<Profile[]>({
    url: `${prefix}/role`,
    method: "POST",
    body: { role },
  });
}

export async function deleteProfile(id: string) {
  return api<Profile>({
    url: `${prefix}/${id}`,
    method: "DELETE",
  });
}

export default {
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  getProfilesByRole,
  deleteProfile,
};
