import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function Layout({
  routes,
}: {
  routes: {
    path: string;
    element: JSX.Element;
    label: string;
    comingSoon?: boolean;
  }[];
}) {
  return (
    <div className="flex flex-col">
      <Header routes={routes} />
      <div className="container py-8">
        <Outlet />
      </div>
    </div>
  );
}
