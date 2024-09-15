import { Layout } from "@/components/layout";
import { DashboardPage } from "@/pages/private/restaurateurs/dashboard.page";
import { DinningRoomsPage } from "@/pages/private/restaurateurs/dinning-rooms.page";
import { InformationsPage } from "@/pages/private/restaurateurs/informations.page";
import { NewRestaurantPage } from "@/pages/private/restaurateurs/new-restaurant.page";
import AddReservation from "@/pages/private/restaurateurs/reservations/reservation-add.page";
import ReservationDetail from "@/pages/private/restaurateurs/reservations/reservation-details.page";
import { ReservationsPage } from "@/pages/private/restaurateurs/reservations/reservations.page";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRoutes } from "../main.routes";

const restaurateurRoutes = [
  { path: "/", element: <Navigate to="/dashboard" />, label: "Accueil" },
  { path: "/dashboard", element: <DashboardPage />, label: "Dashboard" },
  {
    path: "/reservations",
    element: <ReservationsPage />,
    label: "Réservations",
  },
  {
    path: "/informations",
    element: <InformationsPage />,
    label: "Informations",
  },
  {
    path: "/dinning-rooms",
    element: <DinningRoomsPage />,
    label: "Salle",
    comingSoon: true,
  },
];

export const RestaurateurRoutes = () => {
  const [user] = useAtom(userAtom);

  const { setRoutes } = useRoutes();

  if (user?.restaurants.length === 0) {
    return (
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<NewRestaurantPage />} />
        </Route>
      </Routes>
    );
  }

  setRoutes(restaurateurRoutes);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {restaurateurRoutes
          .filter((route) => !route.comingSoon)
          .map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        <Route path="/reservations/new" element={<AddReservation />} />

        <Route path="/reservations/:id" element={<ReservationDetail />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
