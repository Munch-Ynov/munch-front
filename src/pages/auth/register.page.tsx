import { RegisterProfileForm } from "@/components/auth/register-profile.form";
import { Button } from "@/components/ui/button";
import { RoleEnum } from "@/models/enum/role-enum";
import { MoveRight } from "lucide-react";
import { useState } from "react";

export function RegisterPage() {
  const [isRestaurant, setIsRestaurant] = useState(false);
  return (
    <div className="min-h-screen flex-col">
      <div className="flex flex-row-reverse my-4 h-full">
        {isRestaurant ? (
          <Button variant={"link"} onClick={() => setIsRestaurant(false)}>
            Se connecter en tant qu'utilisateur
            <MoveRight size={24} className="pl-2" />
          </Button>
        ) : (
          <Button variant={"link"} onClick={() => setIsRestaurant(true)}>
            Se connecter en tant que restaurateur
            <MoveRight size={24} className="pl-2" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center h-full gap-8 mt-12 ">
        <RegisterProfileForm
          role={isRestaurant ? RoleEnum.RESTAURATEUR : RoleEnum.USER}
        />
      </div>
    </div>
  );
}
