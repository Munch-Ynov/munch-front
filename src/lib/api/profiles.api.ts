import { api } from "@/lib/api/api";
import { RoleEnum } from "@/models/enum/role-enum";
import { Profile } from "@/models/profile.model";

const prefix = "profile";

export async function createProfile(profile: Profile) {
  return api<Profile>(prefix, "POST", profile);
}

export async function updateProfile(profile: Profile) {
  return api<Profile>(prefix, "PUT", profile);
}

export async function getAllProfiles() {
  return api<Profile[]>(prefix, "GET");
}

export async function getProfileById(id: string) {
  return api<Profile>(`${prefix}/${id}`, "GET");
}

export async function getProfilesByRole(role: RoleEnum) {
  return api<Profile[]>(`${prefix}/role`, "POST", { role });
}

export async function deleteProfile(id: string) {
  return api<Profile>(`${prefix}/${id}`, "DELETE");
}

export default {
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  getProfilesByRole,
  deleteProfile,
};
