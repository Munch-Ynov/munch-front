import { cn } from "@/lib/utils";
import { PriceCategoryEnum } from "@/models/enum/price-category.enum";
import { HeartIcon } from "lucide-react";
import type { Restaurant } from "../../models/restaurant.model";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const RestaurantCard = ({
  restaurant,
  isFavorite,
  onClick,
  toggleFavorite,
}: {
  restaurant: Restaurant;
  isFavorite?: boolean;
  onClick?: () => void;
  className?: string;
  toggleFavorite?: () => void;
}) => {
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
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      onClick={onClick}
      className="overflow-hidden cursor-pointer"
    >
      <div className="relative h-48">
        <img
          src={`https://picsum.photos/seed/${restaurant.id}/600/600`}
          alt={restaurant.name}
          className={cn(
            "object-cover w-full h-full",
            onClick ? "cursor-pointer" : ""
          )}
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
              toggleFavorite?.();
            }}
            variant="ghost"
            size="icon"
            className="mt-1"
          >
            <HeartIcon className={cn("h-6 w-6", isFavorite ? "text-red-500 fill-current" : "text-gray-400")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
