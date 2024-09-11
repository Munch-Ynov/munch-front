import { Heart, HeartIcon } from "lucide-react";
import type { Restaurant } from "../../models/restaurant.model";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PriceCategoryEnum } from "@/models/enum/price-category.enum";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

const RestaurantCard = ({
  restaurant,
  onClick,
}: {
  restaurant: Restaurant;
  onClick?: () => void;
  className?: string;
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

  const handleAddFavorite = () => {
    console.log("TODO : Add Favorite");
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
              handleAddFavorite();
            }}
            variant="ghost"
            size="icon"
            className="mt-1"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
