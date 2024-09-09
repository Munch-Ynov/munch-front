import { HeartIcon } from 'lucide-react';
import type { Restaurant } from '../../models/restaurant.model';
import { cn } from '@/lib/utils';

// TODO
const RestaurantCard = ({
  restaurant,
  onClick,
  className,
}: {
  restaurant: Restaurant,
  onClick?: () => void,
  className?: string,
}) => {
  return (
    <div
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      onClick={onClick}
      className={cn(onClick ? "cursor-pointer hover:bg-gray-100" : '', 'flex row-auto', 'h-[200px] rounded-sm', className)}>
      {/* image */}
      <div className="flex-2">
        <img src={
          restaurant.image ?? `https://picsum.photos/seed/${restaurant.id}/200/200`
        } alt={restaurant.name} className="w-full h-full object-cover rounded-lg" />
      </div>
      {/* infos */}
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold">{restaurant.name}</h3>
        <p className="text-sm text-gray-500">{restaurant.description}</p>
      </div>
      {/* if favorite */}
      <div className="flex-1 flex justify-end items-center p-4">
        {restaurant.isFavorite ? <HeartIcon className="text-red-500" /> : null}
      </div >
    </div>
  );
}

export default RestaurantCard;
