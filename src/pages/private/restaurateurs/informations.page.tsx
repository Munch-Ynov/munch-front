import { RegisterRestaurantForm } from "@/components/auth/register-restaurant.form";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/lib/api/api";
import api from "@/lib/api/restaurant.api";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const InformationsPage = () => {
  const [user] = useAtom(userAtom);
  const { data, isLoading } = useQuery({
    queryKey: ["my-restaurant"],
    queryFn: async () => await api.getRestaurantByOwner(user?.id),
    retry: false,
  });

  const handleNewResto = () => {
    toast.info("Création d'un nouveau restaurant");
  };

  return (
    <div className="flex justify-center my-4">
      <RegisterRestaurantForm isNew={!data} />
    </div>
  );
};
