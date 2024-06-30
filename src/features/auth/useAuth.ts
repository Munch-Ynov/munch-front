import { AuthContext } from "@/features/auth/auth.context";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
