//  page showing the details of a reservation , allowing the user to cancel it.

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { useConfirm } from '@/hooks/useConfirm';
import type { ErrorMessage } from '@/lib/api/api';
import reservationApi from '@/lib/api/reservation.api';
import type { Reservation } from '@/models/reservation.model';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ReservationDetail = () => {
  const { id } = useParams();


  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const { data } = useQuery({
    queryKey: ['reservation', id, lastUpdate],
    queryFn: async () => id ? await reservationApi.getReservationById(id) : {
      message: 'Reservation not found',
      error: 'Not Found',
      statusCode: 404,
    },
  });

  const reservation = data as Reservation;
  const loading = !data;

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

  if (loading) return <Loader />
  if (!data || (data as ErrorMessage).statusCode) return <h1>La reservation n'existe pas</h1>

  return (
    <div>
      <p>Date: {format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}</p>
      <p>Nombre de personnes: {reservation.nb_people}</p>
      <p>Statut: {reservation.status}</p>
      <p>Nom: {reservation.name}</p>
      {/* two button accept and reject */}
      {reservation.status === 'PENDING' && (
        <div className="flex gap-4">
          <Button onClick={() => rejectReservation(reservation.id)}>Refuser</Button>
          <Button onClick={() => acceptReservation(reservation.id)}>Accepter</Button>
        </div>
      )}

    </div>
  );
};

export default ReservationDetail;

