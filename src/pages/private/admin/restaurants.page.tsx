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
import { RestaurantsColumns } from "@/components/restaurant/restaurants.columns";
import { PlusCircle } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import useParam from "@/hooks/useParam/useParam";

export const RestaurantsPage = () => {
  const [page, setPage] = useParam<number>("page", { default: 0 });

  const { data, isLoading } = useQuery({
    queryKey: ["restaurants", page],
    queryFn: async () =>
      await api.getAllRestaurants({
        page: page,
      }),
  });
  const content = data?.content || [];

  return (
    <main className="flex-1 items-start gap-4 md:gap-8 ">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  Liste des Restaurants
                  <Button size="lg" className="h-8 gap-1">
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
              {!isLoading && content && content.length === 0 && (
                <p>Aucun restaurant trouvé.</p>
              )}
              {!isLoading && content && content.length > 0 && (
                <DataTable
                  columns={RestaurantsColumns}
                  data={content}
                  filterName={RestaurantsColumns[0].id}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
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
