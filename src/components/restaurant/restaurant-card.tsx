import { cn } from "@/lib/utils";
import { PriceCategoryEnum } from "@/models/enum/price-category.enum";
import { HeartIcon } from "lucide-react";
import type { Restaurant } from "../../models/restaurant.model";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth.store";
import api from "@/lib/api/restaurant.api";
import type { Profile } from "@/models/profile.model";

const RestaurantCard = ({
  restaurant,
  isFavorite,
  onFavorite,
}: {
  restaurant: Restaurant;
  isFavorite?: boolean;
  onClick?: () => void;
  className?: string;
  onFavorite?: () => void;
}) => {
  const [user] = useAtom<Profile>(userAtom);
  const [isFav, setIsFav] = useState(isFavorite);

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    if (!user) {
      toast.error(
        "Vous devez être connecté pour ajouter un restaurant aux favoris"
      );
      return;
    }
    toggleFavorite(restaurant.id);
  };

  const toggleFavorite = async (restaurantId: string) => {
    setIsFav(!isFav);
    if (isFav) {
      await api
        .removeFavoriteRestaurant(user?.id, restaurantId)
        .then(() => {
          toast.success("Restaurant retiré des favoris");
        })
        .catch(() => {
          toast.error(
            "Erreur lors de la suppression du restaurant des favoris"
          );
        });
    } else {
      await api
        .addFavoriteRestaurant(user?.id, restaurantId)
        .then(() => {
          toast.success("Restaurant ajouté aux favoris");
        })
        .catch(() => {
          toast.error("Erreur lors de l'ajout du restaurant aux favoris");
        });
    }
    onFavorite?.()
  };

  const getPriceSymbol = (price: PriceCategoryEnum) => {
    switch (price) {
      case PriceCategoryEnum.ECO:
        return "€";
      case PriceCategoryEnum.MODERATE:
        return "€€";
      case PriceCategoryEnum.EXPENSIVE:
        return "€€€";
      case PriceCategoryEnum.VERY_EXPENSIVE:
        return "€€€€";
    }
  };

  return (
    <Card
      key={restaurant.id}
      className="overflow-hidden cursor-pointer"
    >
      <div className="relative h-48">
        <AdvancedImage
          cldImg={cld.image(restaurant?.main_picture)}
          alt="main_picture"
          className="w-full h-full object-cover rounded-t-md mb-2"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.address}</p>
            <Badge variant="outline" className="mt-2">
              {getPriceSymbol(restaurant.price)}
            </Badge>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
            variant="ghost"
            size="icon"
            className="mt-1"
          >
            <HeartIcon
              className={cn(
                "h-6 w-6",
                isFav ? "text-red-500 fill-current" : "text-gray-400"
              )}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
