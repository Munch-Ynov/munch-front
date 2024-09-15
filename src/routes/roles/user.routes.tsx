import { Layout } from "@/components/layout";
import DashboardPage from "@/pages/private/users/dashboard.page";
import { FavoritesPage } from "@/pages/private/users/favorites.page";
import { ReservationsPage } from "@/pages/private/users/reservations/reservations.page";
import RestaurantDetail from "@/pages/public/restaurant/restaurant-details.page";
import { RestaurantList } from "@/pages/public/restaurant/restaurant-list.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRoutes } from "../main.routes";

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
  const [user] = useAtom(userAtom);

  const { setRoutes } = useRoutes();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setRoutes(userRoutes);
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      </Route>
    </Routes>
  );
};
