import { Profile } from "@/models/profile.model";
import { atom } from "jotai";

// For atoms that need to be persisted in local storage & it's JSON serializable
const atomWithLocalStorage = (key: any, initialValue: any) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};

// For atoms that need to be persisted in local storage & it's NOT JSON serializable
const atomWithLocalStorageNonJson = (key: string, initialValue: undefined) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return item;
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, nextValue);
    }
  );
  return derivedAtom;
};

// Create atoms with local storage persistence
export const userAtom = atomWithLocalStorage("user", undefined);
export const accessTokenAtom = atomWithLocalStorageNonJson(
  "accessToken",
  undefined
);
export const refreshTokenAtom = atomWithLocalStorageNonJson(
  "refreshToken",
  undefined
);
