import { userAtom } from "@/features/auth/auth.store";
import { LoginPage } from "@/pages/auth/login.page";
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
