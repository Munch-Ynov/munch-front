import { useAtom } from "jotai";
import { Navigate, useLocation } from "react-router-dom";
import { userAtom } from "./auth.store";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [user] = useAtom(userAtom);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
