import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/private/admin/dashboard.page";
import { ReportsPage } from "@/pages/private/admin/reports.page";
import { Layout } from "@/components/layout";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { RestaurantsPage } from "@/pages/private/admin/restaurants.page";
import { ProfilesPage } from "@/pages/private/admin/profiles.page";

const adminRoutes = [
  { path: "/", element: <Navigate to="/dashboard" />, label: "Accueil" },
  { path: "/dashboard", element: <DashboardPage />, label: "Dashboard" },
  { path: "/users", element: <ProfilesPage />, label: "Utilisateurs" },
  { path: "/reports", element: <ReportsPage />, label: "Signalements" },
  { path: "/restaurants", element: <RestaurantsPage />, label: "Restaurants" },
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
