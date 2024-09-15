import { Layout } from "@/components/layout";
import { LoginPage } from "@/pages/auth/login.page";
import { RegisterPage } from "@/pages/auth/register.page";
import PublicPage from "@/pages/public";
import { RestaurantList } from "@/pages/public/restaurant/restaurant-list.page";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { createContext, useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./protected.routes";
import RestaurantDetail from "@/pages/public/restaurant/restaurant-details.page";

export const MainRoutes = () => {
  const [user] = useAtom(userAtom);
  return (
    <RoutesProvider>
      {
        user ? <ProtectedRoutes /> : <PublicRoutes />
      }
    </RoutesProvider>
  );
}

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
};


const RoutesContext = createContext<{
  routes: {
    path: string;
    element: JSX.Element;
    label: string;
    comingSoon?: boolean;
  }[];
  setRoutes: React.Dispatch<
    React.SetStateAction<{
      path: string;
      element: JSX.Element;
      label: string;
      comingSoon?: boolean;
    }[]>
  >;
}>({
  routes: [],
  setRoutes: () => { },
});

export const useRoutes = () => useContext(RoutesContext);

export const RoutesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [routes, setRoutes] = useState<{
    path: string;
    element: JSX.Element;
    label: string;
    comingSoon?: boolean;
  }[]>([]);
  return (
    <RoutesContext.Provider value={{ routes, setRoutes }}>
      {children}
    </RoutesContext.Provider>
  );
}

