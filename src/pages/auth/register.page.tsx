import { RegisterProfileForm } from "@/components/auth/register-profile.form";
import { Button } from "@/components/ui/button";
import useParam from "@/hooks/useParam/useParam";
import { RoleEnum } from "@/models/enum/role-enum";
import { MoveRight } from "lucide-react";

export function RegisterPage() {
  const [accountType, setAccountType] = useParam("account", {
    default: "user",
  });

  const isRestaurant = accountType === "restaurant";

  return (
    <div className="min-h-screen flex-col">
      <div className="flex flex-row-reverse my-4 h-full">
        {isRestaurant ? (
          <Button variant={"link"} onClick={() => setAccountType("user")}>
            Se connecter en tant qu'utilisateur
            <MoveRight size={24} className="pl-2" />
          </Button>
        ) : (
          <Button variant={"link"} onClick={() => setAccountType("restaurant")}>
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
