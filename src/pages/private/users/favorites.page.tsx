import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import api from "@/lib/api/restaurant.api";
import { useQuery } from "@tanstack/react-query";

import RestaurantCard from "@/components/restaurant/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useParam from "@/hooks/useParam/useParam";
import featuresApi from "@/lib/api/features.api";
import type { Category } from "@/models/category.model";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
  const [page, setPage] = useParam<number>("page", { default: 0 });
  const [searchTerm, setSearchTerm] = useState("");


  const { data: dFeatures } = useQuery({
    queryKey: ["features"],
    queryFn: async () => await featuresApi.getFeatures(),
  });
  const features = dFeatures || [];

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [user] = useAtom(userAtom);

  const { data, isLoading } = useQuery({
    queryKey: ["favorites", user?.id, page, searchTerm, selectedFeatures],
    queryFn: async () =>
      await api.getFavoritesRestaurants(user?.id, {
        page: page,
        name: searchTerm,
        size: 8,
        features: selectedFeatures,
      }),
  });
  const content = data?.content || [];

  const navigate = useNavigate();

  const categories = features.reduce((acc, feature) => {
    if (!acc[feature.category.id]) {
      acc[feature.category.id] = feature.category;
    }
    return acc;
  }, {} as Record<string, Category>);

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
            <CardContent>
              {/* search input */}
              <div className="mt-4 relative">
                <Input
                  type="text"
                  placeholder="Rechercher un restaurant"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-10 top-1/2 transform -translate-y-1/2"
                    >
                      <Filter size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-64">
                    <div className="flex items-center mb-4">
                      <h3 className="font-bold">Filtres</h3>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedFeatures([]);
                        }}
                        className="ml-auto"
                      >
                        Réinitialiser
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      {Object.values(categories).map((category) => (
                        <div key={category.id} className="flex flex-col">
                          <h3 className="font-bold">{category.name}</h3>
                          <div className="ml-2">
                            {
                              features.filter((feature) => feature.category.id === category.id).map((feature) => (
                                <div key={feature.id} className="flex items-center ml-2 w-full h-8">
                                  <Input
                                    checked={selectedFeatures.includes(feature.id)}
                                    type="checkbox"
                                    id={feature.id}
                                    className="w-4 h-4 mr-2"
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedFeatures([...selectedFeatures, feature.id])
                                      } else {
                                        setSelectedFeatures(selectedFeatures.filter((f) => f !== feature.id))
                                      }
                                    }} />
                                  <label htmlFor={feature.id}>{feature.name}</label>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>

                </Popover>
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
                      <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          isFavorite={true}

                          className="mb-4"
                        />
                      </Link>
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
