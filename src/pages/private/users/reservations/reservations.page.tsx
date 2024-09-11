import ReservationCard from "@/components/reservation/reservation-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Loader } from '@/components/ui/loader';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useParam from "@/hooks/useParam/useParam";
import reservationApi from "@/lib/api/reservation.api";
import type { UserProfile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { useNavigate } from "react-router-dom";

export const ReservationsPage = () => {

  const [user] = useAtom<UserProfile | undefined>(userAtom);

  if (!user) throw new Error('User not found');

  const [page, setPage] = useParam<number>('page', { default: 0 });

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", page],
    queryFn: async () => await reservationApi.getReservationByUser(
      user?.id,
      {
        page: page,
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
                  Liste des reservations
                </div>
              </CardTitle>
            </CardHeader>
            {/* search input */}
            {/* <div className="flex justify-between">
              <Input
                type="search"
                placeholder="Rechercher une reservation"
                className="w-[200px] h-10 px-3
                placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary-500"
              />
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8 mt-4">
              {isLoading && <Loader />}
              {!isLoading && content && content.length === 0 && (
                <p>Aucun reservation trouvé.</p>
              )}
              {!isLoading && content && content.length > 0 &&
                content.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onClick={() => navigate(`/reservations/${reservation.id}`)}
                    className="mb-4"
                  />
                ))
              }
            </div>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground mt-2 ">
                Affichage de <strong>{data?.numberOfElements || 0}</strong> sur <strong>{data?.totalElements || 0}</strong> réservations
              </div>
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
            </CardFooter>

          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
