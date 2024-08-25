import { Layout } from "@/components/layout";
import { FavoritesPage } from "@/pages/private/users/favorites.page";
import { Home } from "@/pages/private/users/home.page";
import { ProfilePage } from "@/pages/private/users/profil.page";
import { ReservationsPage } from "@/pages/private/users/reservations.page";
import { NotFoundPage } from "@/pages/public/not-found.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";

const userRoutes = [
  { path: "/", element: <Navigate to="/restaurants" />, label: "Accueil" },
  { path: "/restaurants", element: <Home />, label: "Restaurants" },
  { path: "/favorites", element: <FavoritesPage />, label: "Favoris" },
  {
    path: "/reservations",
    element: <ReservationsPage />,
    label: "Réservations",
  },
  { path: "/profile", element: <ProfilePage />, label: "Mon Profil" },
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
