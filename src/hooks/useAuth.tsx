import { AuthContext } from "@/providers/context/auth.context";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
