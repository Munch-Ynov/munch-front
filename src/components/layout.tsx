import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function Layout({
  routes,
}: {
  routes: { path: string; element: JSX.Element; label: string }[];
}) {
  return (
    <div className="flex flex-col">
      <Header routes={routes} />
      <Outlet />
    </div>
  );
}
