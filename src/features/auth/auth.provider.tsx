import { useAtom } from "jotai";
import { accessTokenAtom, refreshTokenAtom, userAtom } from "./auth.store";
import api from "./auth.service";
import { RoleEnum } from "@/models/enum/role-enum";
import { Auth } from "@/models/auth.model";
import { AuthContext } from "@/features/auth/auth.context";
import { UserProfile } from "@/models/user-profile.model";
import { RestaurateurProfile } from "@/models/restaurateur-profile";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useAtom(userAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  const register = async (
    email: Auth["email"],
    password: Auth["password"],
    role: RoleEnum
  ) => {
    await api.register(email, password, role).then((res) => {
      //
    });
  };

  const login = async (email: string, password: string) => {
    await api.login(email, password).then((response) => {
      localStorage.setItem("accessToken", response?.accessToken as string);
      getUserProfile();
    });
  };

  const refresh = async () => {
    await api.refreshToken().then((response) => {
      localStorage.setItem("accessToken", response?.accessToken as string);
    });
  };

  const getUserProfile = async () => {
    await api.getUserProfile().then((response) => {
      console.log(response);
    });
  };

  const logout = () => {
    setUser(undefined);
    // delete token from local storage
  };

  return (
    <AuthContext.Provider value={{ register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
