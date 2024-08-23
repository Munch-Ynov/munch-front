import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { useAuth } from "@/hooks/useAuth";

export function Layout() {
  const [user] = useAtom(userAtom);
  const { logout } = useAuth();

  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
