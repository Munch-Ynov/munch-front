import { cld } from "@/main";
import { userAtom } from "@/store/auth.store";
import { AdvancedImage } from "@cloudinary/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useAtom } from "jotai";
import { UserCircle2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EditProfile } from "./auth/edit.profil";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const Header = ({
  routes,
}: {
  routes: {
    path: string;
    element: JSX.Element;
    label: string;
    comingSoon?: boolean;
  }[];
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
              .map((route) => {
                // if the route is "comming soon" disable the link and display a badge and a tooltip
                if (route.comingSoon) {
                  return (
                    <Tooltip key={route.path} >
                      <TooltipContent side="top" align="center" className="p-2 bg-gray-800 text-white rounded-lg">
                        Bientôt disponible
                      </TooltipContent>
                      <TooltipTrigger>
                        <span className="flex items-center gap-1 cursor-not-allowed">
                          <span className="text-muted-foreground">{route.label}</span>
                          <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                            Soon
                          </span>
                        </span>
                      </TooltipTrigger>
                    </Tooltip>
                  );
                }
                return (
                  <Link
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "text-muted-foreground",
                      location.pathname === route.path && "text-primary font-bold"
                    )}

                  >
                    {route.label}
                  </Link>
                );
              })}
          </div>
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="bottom">Mon profil </TooltipContent>
          </Tooltip>
        </div>
      </div >
      <EditProfile open={open} onOpenChange={() => setOpen(false)} />
    </header >
  );
};
