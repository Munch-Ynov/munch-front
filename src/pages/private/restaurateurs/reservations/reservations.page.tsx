import {
  File
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useParam from "@/hooks/useParam/useParam";
import reservationApi from "@/lib/api/reservation.api";
import { cn } from "@/lib/utils";
import toFrenchStatus from "@/models/enum/reservation-status.enum";
import type { RestaurateurProfile } from "@/models/profile.model";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useConfirm } from "@/hooks/useConfirm";
import { toast } from "sonner";



export const ReservationsPage = () => {

  const [user] = useAtom<RestaurateurProfile | undefined>(userAtom);

  if (!user?.restaurants?.length) throw new Error('Restaurant not found');

  // if it shows the past reservations
  const [status, setStatus] = useParam<string>('status', { default: 'all' });
  const [available, setAvailable] = useParam<string>('available', { default: 'all' });

  const [page, setPage] = useParam<number>('page', { default: 0 });

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", user?.restaurants[0].id, page, status, available, lastUpdate],
    queryFn: async () => await reservationApi.getReservationByRestaurant(
      user?.restaurants[0].id,
      {
        page: page,
      },
      {
        past: status !== 'upcoming',
        upcoming: status !== 'past',
        available: available !== 'all',
      }
    ),
  });

  const reservations = data?.content || [];

  const navigate = useNavigate();

  const exportData = () => {
    // create and download a csv file with the reservations data
    const csv = reservations.map((reservation) => {
      return [
        format(reservation.date, 'dd/MM/yyyy'),
        reservation.nb_people,
        format(reservation.date, 'HH:mm'),
        reservation.status,
      ].join(';');
    }).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const { confirm } = useConfirm();


  const acceptReservation = async (id: string) => {
    const res = await confirm({
      title: 'Accepter la reservation',
      content: 'Voulez-vous vraiment accepter cette reservation ?',
    });
    if (res) {
      const data = await reservationApi.acceptReservation(id);
      if (data) {
        toast.success('Reservation acceptée');
        setLastUpdate(Date.now());
      }
    }
  };

  const rejectReservation = async (id: string) => {
    const res = await confirm({
      title: 'Refuser la reservation',
      content: 'Voulez-vous vraiment refuser cette reservation ?',
    });
    if (res) {
      const data = await reservationApi.rejectReservation(id);
      if (data) {
        toast.success('Reservation refusée');
        setLastUpdate(Date.now());
      }
    }
  }

  if (isLoading) return <Loader />;




  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
      <Tabs defaultValue={status} onValueChange={(value) => setStatus(value)}>
        <div className="flex items-center">
          <div className="flex justify-between items-center gap-4 w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Passées</TabsTrigger>
            </TabsList>

            <Switch checked={available === 'available'} onCheckedChange={(checked) => setAvailable(checked ? 'available' : 'all')} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={exportData}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exporter
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => navigate('/reservations/new')}>
              Ajouter
            </Button>
          </div>
        </div>
        <TabsContent value={status}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Réservations</CardTitle>
              <CardDescription>
                Liste des réservations de vos clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Nom
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Nombre de personnes
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Heure d'arrivée
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Statut
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id} className="cursor-pointer">
                      <TableCell className="hidden md:table-cell">
                        {reservation.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(reservation.date, 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {reservation.nb_people}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(reservation.date, 'HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline"
                          // color change based on status
                          className={cn('text-xs', {
                            'bg-green-100 text-green-800': reservation.status === 'ACCEPTED',
                            'bg-red-100 text-red-800': reservation.status === 'CANCELED',
                            'bg-yellow-100 text-yellow-800': reservation.status === 'PENDING',
                            'bg-gray-100 text-gray-800': reservation.status === 'REFUSED',
                          })}
                        >{toFrenchStatus(reservation.status)}</Badge>
                      </TableCell>


                      {reservation.status === 'PENDING' && (
                        <TableCell className="hidden md:table-cell">
                          <Button variant="ghost" size="sm" className=" h-8" onClick={() => acceptReservation(reservation.id)}>
                            Accepter
                          </Button>
                          <Button variant="destructive" size="sm" className="h-8 " onClick={() => rejectReservation(reservation.id)}>
                            Refuser
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground mt-2">
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
};
