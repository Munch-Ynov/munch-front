import { Button } from "./ui/button";
import { userAtom } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import { useConfirm } from "@/hooks/useConfirm";
import { useAtom } from "jotai";
import { Link, useLocation } from "react-router-dom";
import { LogOut, UserCircle2Icon } from "lucide-react";
import { useState } from "react";
import { EditProfile } from "./auth/edit.profil";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";

export const Header = ({
  routes,
}: {
  routes: { path: string; element: JSX.Element; label: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const location = useLocation();

  return (
    <header className="border-b shrink-0">
      <div className="container flex items-center h-16 ">
        <nav className="flex-col hidden gap-4 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/">
            <img src="/img/logo.svg" width="96" height="32" alt="Munch" />
          </Link>
          <div className="text-lg font-medium md:flex md:flex-row md:gap-5 md:text-sm lg:gap-6">
            {routes
              .filter((route) => route.path !== "/")
              .map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`text-muted-foreground ${
                    location.pathname === route.path
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  {route.label}
                </Link>
              ))}
          </div>
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => setOpen(!open)}
          >
            {user.role === "ADMIN" ? (
              "Admin"
            ) : user.avatar ? (
              <AdvancedImage
                cldImg={cld.image(user.avatar)}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <UserCircle2Icon className="w-10 h-10 text-primary" />
            )}
          </Button>
        </div>
      </div>
      <EditProfile open={open} onOpenChange={() => setOpen(false)} />
    </header>
  );
};
