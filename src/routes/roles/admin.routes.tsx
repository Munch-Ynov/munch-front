import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/private/admin/dashboard.page";
import { UsersPage } from "@/pages/private/admin/users.page";
import { ReportsPage } from "@/pages/private/admin/reports.page";
import { Layout } from "@/components/layout";
import { NotFoundPage } from "@/pages/public/not-found.page";

const adminRoutes = [
  { path: "/", element: <DashboardPage />, label: "Accueil" },
  { path: "/dashboard", element: <DashboardPage />, label: "Dashboard" },
  { path: "/users", element: <UsersPage />, label: "Utilisateurs" },
  { path: "/reports", element: <ReportsPage />, label: "Rapports" },
];

export const AdminRoutes = () => {
  const [user] = useAtom(userAtom);
  return (
    <Routes>
      <Route path="/" element={<Layout routes={adminRoutes} />}>
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
