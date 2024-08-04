import { Button } from "@/components/ui/button";
import { RegisterProfileForm } from "@/features/auth/components/register-profile.form";
import { RegisterRestaurantForm } from "@/features/auth/components/register-restaurant.form";
import { RoleEnum } from "@/models/enum/role-enum";
import { useState } from "react";

export function RegisterPage() {
  const [isRestaurant, setIsRestaurant] = useState(false);
  return (
    <div className="min-h-screen flex-col">
      <div className="flex flex-row-reverse my-4 h-full">
        {isRestaurant ? (
          <Button variant={"link"} onClick={() => setIsRestaurant(false)}>
            Se connecter en tant qu'utilisateur
          </Button>
        ) : (
          <Button variant={"link"} onClick={() => setIsRestaurant(true)}>
            Se connecter en tant que restaurateur
          </Button>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center h-full gap-8 flex-1">
        <RegisterProfileForm
          role={isRestaurant ? RoleEnum.RESTAURATEUR : RoleEnum.USER}
        />
        {isRestaurant && <RegisterRestaurantForm />}
      </div>
    </div>
  );
}
