import { RestaurateurProfile } from "@/models/restaurateur-profile";
import { UserProfile } from "@/models/user-profile.model";
import { atom } from "jotai";

export const userAtom = atom<UserProfile | RestaurateurProfile | undefined>(
  undefined
);

export const accessTokenAtom = atom<string | undefined>(undefined);

export const refreshTokenAtom = atom<string | undefined>(undefined);
