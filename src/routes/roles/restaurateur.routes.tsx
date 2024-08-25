import { Layout } from "@/components/layout";
import { DashboardPage } from "@/pages/private/restaurateurs/dashboard.page";
import { DinningRoomsPage } from "@/pages/private/restaurateurs/dinning-rooms.page";
import { InformationsPage } from "@/pages/private/restaurateurs/informations.page";
import { ReservationsPage } from "@/pages/private/restaurateurs/reservations.page";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Route, Routes } from "react-router-dom";

const restaurateurRoutes = [
  { path: "/", element: <DashboardPage />, label: "Accueil" },
  { path: "/dashboard", element: <DashboardPage />, label: "Dashboard" },
  {
    path: "/reservations",
    element: <ReservationsPage />,
    label: "Réservations",
  },
  { path: "/dinning-rooms", element: <DinningRoomsPage />, label: "Salle" },
  {
    path: "/informations",
    element: <InformationsPage />,
    label: "Informations",
  },
];

export const RestaurateurRoutes = () => {
  const [user] = useAtom(userAtom);
  return (
    <Routes>
      <Route path="/" element={<Layout routes={restaurateurRoutes} />}>
        {restaurateurRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
