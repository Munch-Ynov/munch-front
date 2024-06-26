import { createContext, useState } from "react";
import { Provider, atom, createStore } from "jotai";
import { useAtom } from "jotai";
import { userAtom, userStore } from "./auth.store";
import api from "./auth.service";
import { RoleEnum } from "@/models/enum/role-enum";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useAtom(userAtom);

  const register = (username: string, password: string, role: RoleEnum) => {
    api.register(username, password, role).then((res) => {
      //
    });
  };

  const login = (username: string, password: string) => {
    api.login(username, password).then((user) => {
      //
    });
  };

  const logout = () => {
    setUser(undefined);
    // delete token from local storage
  };

  return <Provider store={userStore}>{children}</Provider>;
}
