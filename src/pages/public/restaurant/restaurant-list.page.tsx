import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import api from "@/lib/api/restaurant.api";
import { useQuery } from "@tanstack/react-query";


import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import usePage from "@/hooks/usePage";
import useSearch from "@/hooks/useSearch";
import { useRef } from "react";
import RestaurantCard from "@/components/restaurant/restaurant-card";
import { useNavigate } from "react-router-dom";

export const RestaurantList = () => {


  const page = usePage();

  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useSearch({
    param: "name",
    ref: searchRef,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => await api.getAllRestaurants(
      {
        page,
        name: search,
      }
    ),
  });
  const content = data?.content || [];

  const navigate = useNavigate();

  return (
    <main className="flex-1 items-start gap-4 md:gap-8 ">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  Liste des Restaurants
                </div>
              </CardTitle>
            </CardHeader>
            {/* search input */}
            <div className="flex justify-between">
              <Input
                type="search"
                placeholder="Rechercher un restaurant"
                ref={searchRef}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[200px] h-10 px-3
                placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8 mt-4">
              {isLoading && <Loader />}
              {!isLoading && content && content.length === 0 && (
                <p>Aucun restaurant trouvé.</p>
              )}
              {!isLoading && content && content.length > 0 &&
                content.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                    className="mb-4"
                  />
                ))
              }
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </main>

  );
}

