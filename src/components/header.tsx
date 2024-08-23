import { Button } from "./ui/button";
import { userAtom } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import { useConfirm } from "@/hooks/useConfirm";
import { useAtom } from "jotai";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [user] = useAtom(userAtom);
  const location = useLocation();
  const { confirm } = useConfirm();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const isConfirmed = await confirm(
      "Vous êtes sur le point de vous déconnecter. Êtes-vous sûr de vouloir continuer ?"
    );
    if (isConfirmed) {
      logout();
    }
  };

  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img
            src="./img/logo.png"
            width="32"
            height="32"
            className="rounded-full"
            alt="Avatar"
          />
          <span>Munch</span>
        </Link>
        <Link
          to="#"
          className={`text-muted-foreground ${
            location.pathname === "/" ? "font-bold" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="#"
          className={`text-muted-foreground ${
            location.pathname === "/reservations" ? "font-bold" : ""
          }`}
        >
          Réservations
        </Link>
        <Link
          to="#"
          className={`text-muted-foreground ${
            location.pathname === "/salle" ? "font-bold" : ""
          }`}
        >
          Salle
        </Link>
        <Link
          to="#"
          className={`text-muted-foreground ${
            location.pathname === "/informations" ? "font-bold" : ""
          }`}
        >
          Informations
        </Link>
      </nav>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" onClick={handleLogout}>
          {user.name || "User"}
        </Button>
      </div>
    </header>
  );
};
