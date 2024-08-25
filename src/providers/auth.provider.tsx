import { useAtom, useSetAtom } from "jotai";
import {
  accessTokenAtom,
  refreshTokenAtom,
  userAtom,
} from "../store/auth.store";
import api from "../lib/api/auth.api";
import { RoleEnum } from "@/models/enum/role-enum";
import { Auth } from "@/models/auth.model";
import { toast } from "sonner";
import { ProfileCreate } from "@/models/profile.model";
import { AuthContext } from "@/providers/context/auth.context";
import { useState } from "react";
import { set } from "react-hook-form";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const setUser = useSetAtom(userAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (
    email: Auth["email"],
    password: Auth["password"],
    role: RoleEnum,
    profile: ProfileCreate
  ) => {
    await api
      .register(email, password, role, profile)
      .then((res) => {
        setUser(res?.user);
        setAccessToken(res?.accessToken);
        toast.success("Votre compte a été créé avec succès");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await api
      .login(email, password)
      .then((res) => {
        setUser(res?.user);
        setAccessToken(res?.accessToken);
        toast.success("Connexion réussie");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const logout = async () => {
    await api.logout().then(() => {
      setUser(null);
      setAccessToken(undefined);
      setRefreshToken(undefined);
      toast.success("Vous êtes déconnecté");
    });
  };

  return (
    <AuthContext.Provider value={{ register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
