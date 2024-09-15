import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { useRoutes } from "@/routes/main.routes";

export function Layout() {

  const { routes } = useRoutes();

  return (
    <div className="flex flex-col">
      <Header routes={routes} />
      <div className="container py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
