import { Layout } from "@/components/layout";
import { RoleEnum } from "@/models/enum/role-enum";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./admin";
import { UserPage } from "./users";
import { RestaurateurPage } from "./restaurateurs";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth.store";
import { RequireAuth } from "@/components/auth/require-auth";

export default function ProtectedPages() {
  const [user] = useAtom(userAtom);
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <RequireAuth>
              {user?.role === RoleEnum.ADMIN ? (
                <AdminPage />
              ) : user?.role === RoleEnum.RESTAURATEUR ? (
                <RestaurateurPage />
              ) : (
                <UserPage />
              )}
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}
