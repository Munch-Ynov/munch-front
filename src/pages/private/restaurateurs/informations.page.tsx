import { RegisterRestaurantForm } from "@/components/restaurant/register-restaurant.form";
import featuresApi from "@/lib/api/features.api";
import restaurantApi from "@/lib/api/restaurant.api";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const InformationsPage = () => {
  const [user] = useAtom(userAtom);
  const { data: restaurant } = useQuery({
    queryKey: ["my-restaurant"],
    queryFn: async () => await restaurantApi.getRestaurantByOwner(user?.id),
    retry: false,
  });

  const { data: features } = useQuery({
    queryKey: ["features"],
    queryFn: async () => await featuresApi.getFeatures(),
  });

  return (
    <div className="flex justify-center gap-4">
      {restaurant && features && (
        <RegisterRestaurantForm restaurant={restaurant} features={features} />
      )}
    </div>
  );
};
