import { userAtom } from "@/features/auth/auth.store";
import { useAtom } from "jotai";
import { HomeIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  const [user] = useAtom(userAtom);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <span>Logged in as: {user?.email}</span>
          </li>
          <li>
            <Link to="/">
              <HomeIcon />
            </Link>
          </li>
          <li>
            <Link to="/login">Protected</Link>
          </li>
          <li>
            <Link to="/auth-status">Auth Status</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
