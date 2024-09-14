import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import api from "@/lib/api/restaurant.api";
import { useQuery } from "@tanstack/react-query";

import RestaurantCard from "@/components/restaurant/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import useParam from "@/hooks/useParam/useParam";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
  const [page, setPage] = useParam<number>("page", { default: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const [user] = useAtom(userAtom)

  const [updatedAt, setUpdatedAt] = useState(Date.now());

  const { data, isLoading } = useQuery({
    queryKey: ["favorites", user?.id, updatedAt],
    queryFn: async () =>
      await api.getFavoritesRestaurants(user?.id, {
        size: 1000,
      }),
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
                  Liste des Restaurants Favoris
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* search input */}
              <div className="mt-4 relative">
                <Input
                  type="text"
                  placeholder="Rechercher un restaurant, style culinaire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Filter size={18} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-4">
                {isLoading && <Loader />}
                {!isLoading && content && content.length === 0 && (
                  <p>Aucun restaurant trouvé.</p>
                )}
                {!isLoading &&
                  content &&
                  content.length > 0 &&
                  content
                    .filter((restaurant) =>
                      restaurant.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        isFavorite={true}
                        onFavorite={() => setUpdatedAt(Date.now())}
                        onClick={() =>
                          navigate(`/restaurants/${restaurant.id}`)
                        }
                        className="mb-4"
                      />
                    ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* page */}
      <div className="flex justify-end mt-3">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={!data || page <= 0}
          className="h-10 px-3 mr-2"
        >
          Précédent
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={!data || data.totalPages <= page + 1}
          className="h-10 px-3"
        >
          Suivant
        </Button>
      </div>
    </main>
  );
};
