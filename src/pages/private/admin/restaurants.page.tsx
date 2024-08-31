import { Restaurant } from "@/models/restaurant.model";
import { useState } from "react";
import api from "@/lib/api/restaurant.api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { DataTable } from "@/components/table/data-table";
import { RestaurantsColumns } from "@/components/table/restaurants.columns";
import { PlusCircle } from "lucide-react";
import { Loader } from "@/components/ui/loader";

export const RestaurantsPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const { data, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => await api.getAllRestaurants(),
    retry: false,
  });

  return (
    <main className="flex-1 items-start gap-4 md:gap-8 ">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  Liste des Restaurants
                  <Button className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Ajouter
                    </span>
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Vous trouverez ci-dessous la liste de tous les restaurants
                inscrits sur la plateforme.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && <Loader />}
              {!isLoading && data && data.length === 0 && (
                <p>Aucun restaurant trouvé.</p>
              )}
              {!isLoading && data && data.length > 0 && (
                <DataTable columns={RestaurantsColumns} data={data} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};
