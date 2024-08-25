import { userAtom } from "@/store/auth.store";
import { LoginPage } from "@/pages/auth/login.page";
import { RegisterPage } from "@/pages/auth/register.page";
import PublicPage from "@/pages/public";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { useAtom } from "jotai";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./protected.routes";

export const MainRoutes = () => {
  const [user] = useAtom(userAtom);
  return (
    <Routes>
      <Route path="/*" element={user ? <ProtectedRoutes /> : <PublicPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
