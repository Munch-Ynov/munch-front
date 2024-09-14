import { RoleEnum } from "@/models/enum/role-enum";
import { Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth.store";
import { RequireAuth } from "@/components/auth/require-auth";
import { AdminRoutes } from "@/routes/roles/admin.routes";
import { UserRoutes } from "@/routes/roles/user.routes";
import { RestaurateurRoutes } from "./roles/restaurateur.routes";

export function ProtectedRoutes() {
  const [user] = useAtom(userAtom);
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <RequireAuth>
            {user?.role === RoleEnum.ADMIN ? (
              <AdminRoutes />
            ) : user?.role === RoleEnum.RESTAURATEUR ? (
              <RestaurateurRoutes />
            ) : (
              <UserRoutes />
            )}
          </RequireAuth>
        }
      />
    </Routes>
  );
}
