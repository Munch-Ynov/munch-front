import { api } from "@/lib/api/api";
import type { RoleEnum } from "@/models/enum/role-enum";
import type { Profile } from "@/models/profile.model";

const prefix = "profile";

export async function createProfile(profile: Profile) {
  return api<Profile>({
    url: prefix,
    method: "POST",
    body: profile
  });
}

export async function updateProfile(profile: Profile) {
  return api<Profile>({
    url: prefix,
    method: "PUT",
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
  return api<Profile[]>(
    {
      url: `${prefix}/role/${role}`,
      method: "GET",
      body: { role }, // a GET request should not have a body
    }
  );
}

export async function deleteProfile(id: string) {
  return api<Profile>(
    {
      url: `${prefix}/${id}`,
      method: "DELETE",
    }
  );
}

export default {
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  getProfilesByRole,
  deleteProfile,
};
