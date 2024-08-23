import { userAtom } from "@/store/auth.store";
import { LoginPage } from "@/pages/auth/login.page";
import { RegisterPage } from "@/pages/auth/register.page";
import ProtectedPages from "@/pages/private";
import PublicPage from "@/pages/public";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { useAtom } from "jotai";
import { Route, Routes } from "react-router-dom";

export const MainRoutes = () => {
  const [user] = useAtom(userAtom);
  return (
    <Routes>
      <Route path="/" element={user ? <ProtectedPages /> : <PublicPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
