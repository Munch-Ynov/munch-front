/* eslint-disable react-hooks/exhaustive-deps */
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/private/admin/dashboard.page";
import { ReportsPage } from "@/pages/private/admin/reports.page";
import { Layout } from "@/components/layout";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { RestaurantsPage } from "@/pages/private/admin/restaurants.page";
import { ProfilesPage } from "@/pages/private/admin/profiles.page";
import { useRoutes } from "../main.routes";
import { useEffect } from "react";

const adminRoutes = [
  { path: "/", element: <Navigate to="/dashboard" />, label: "Accueil" },
  { path: "/dashboard", element: <DashboardPage />, label: "Dashboard" },
  { path: "/users", element: <ProfilesPage />, label: "Utilisateurs" },
  { path: "/restaurants", element: <RestaurantsPage />, label: "Restaurants" },
  {
    path: "/reports",
    element: <ReportsPage />,
    label: "Signalements",
    comingSoon: true,
  },
];

export const AdminRoutes = () => {
  const [user] = useAtom(userAtom);

  const { setRoutes } = useRoutes();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setRoutes(adminRoutes);
  }, [user]);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
