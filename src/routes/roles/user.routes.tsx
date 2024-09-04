import { Layout } from "@/components/layout";
import DashboardPage from "@/pages/private/users/dashboard.page";
import { FavoritesPage } from "@/pages/private/users/favorites.page";
import { Home } from "@/pages/private/users/home.page";
import { ReservationsPage } from "@/pages/private/users/reservations.page";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { RestaurantList } from "@/pages/public/restaurant-list.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";

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
  return (
    <Routes>
      <Route path="/" element={<Layout routes={userRoutes} />}>
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
