import DashboardPage from "@/pages/private/users/dashboard.page";
import { FavoritesPage } from "@/pages/private/users/favorites.page";
import ReservationDetail from "@/pages/private/users/reservations/reservation-details.page";
import { ReservationsPage } from "@/pages/private/users/reservations/reservations.page";
import RestaurantDetail from "@/pages/public/restaurant/restaurant-details.page";
import { RestaurantList } from "@/pages/public/restaurant/restaurant-list.page";
import { Route, Routes } from "react-router-dom";
import { useRoutes } from "../main.routes";
import { Layout } from "@/components/layout";

const userRoutes = [
  { path: "/", element: <DashboardPage />, label: "Accueil" },
  {
    path: "/restaurants",
    element: <RestaurantList />,
    label: "Restaurants",
  },
  { path: "/favorites", element: <FavoritesPage />, label: "Favoris" },
  {
    path: "/reservations",
    element: <ReservationsPage />,
    label: "Réservations",
  },
];

export const UserRoutes = () => {

  const { setRoutes } = useRoutes();
  setRoutes(userRoutes);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/reservations/:id" element={<ReservationDetail />} />
      </Route>
    </Routes>
  );
};
