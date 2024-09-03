import { Layout } from "@/components/layout";
import { FavoritesPage } from "@/pages/private/users/favorites.page";
import { Home } from "@/pages/private/users/home.page";
import { ReservationsPage } from "@/pages/private/users/reservations.page";
import { NotFoundPage } from "@/pages/public/not-found.page";
import RestaurantDetail from "@/pages/public/restaurant/restaurant-details.page";
import { RestaurantList } from "@/pages/public/restaurant/restaurant-list.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";

const userRoutes = [
  { path: "/", element: <Home />, label: "Accueil" },
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
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
