import { createContext, useState } from "react";
import { atom, createStore } from "jotai";
import { useAtom } from "jotai";
import { userAtom, userStore } from "./auth.store";
import api from "./auth.service";
import { RoleEnum } from "@/models/enum/role-enum";

export const AuthContext = createContext({
  user: undefined,
  register: async (username: string, password: string, role: RoleEnum) => {},
  login: async (username: string, password: string) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useAtom(userAtom);

  const register = async (
    username: string,
    password: string,
    role: RoleEnum
  ) => {
    await api.register(username, password, role).then((res) => {
      //
    });
  };

  const login = async (username: string, password: string) => {
    await api.login(username, password).then((user) => {
      //
    });
  };

  const logout = () => {
    setUser(undefined);
    // delete token from local storage
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
