//  page showing the details of a reservation , allowing the user to cancel it.

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/useConfirm';
import type { ErrorMessage } from '@/lib/api/api';
import reservationApi from '@/lib/api/reservation.api';
import restaurantApi from '@/lib/api/restaurant.api';
import type { Reservation } from '@/models/reservation.model';
import type { Restaurant } from '@/models/restaurant.model';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ReservationDetail = () => {
  const { id } = useParams();


  const navigate = useNavigate();

  const { data: rdata, loading: rloading } = useQuery({
    queryKey: ['reservation', id],
    queryFn: async () => id ? await reservationApi.getReservationById(id) : {
      message: 'Reservation not found',
      error: 'Not Found',
      statusCode: 404,
    },
  });

  const reservation = rdata as Reservation;


  const { data: restaurantData, loading: restaurantLoading } = useQuery({
    queryKey: ['restaurant', reservation?.restaurantId],
    queryFn: async () => {
      if (!reservation) return undefined;
      return await restaurantApi.getRestaurantById(reservation
        .restaurantId);
    }
  });

  const loading = rloading || restaurantLoading;

  const restaurant = restaurantData as Restaurant;

  const { confirm } = useConfirm();

  const cancelReservation = async () => {
    confirm({
      title: 'Annuler la réservation',
      content: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
    }).then((confirmed) => {
      if (confirmed) {
        reservationApi.deleteReservation(reservation.id).then(() => {
          toast.success('Votre réservation a été annulée avec succès');
          navigate('/reservations');
        });
      }
    });
  };


  if (loading) return <Loader />
  if (!rdata || (rdata as ErrorMessage).statusCode) return <h1>La reservation n'existe pas</h1>
  if (!restaurantData || (restaurantData as ErrorMessage).statusCode) return <h1>Le restaurant n'existe pas</h1>

  return (
    <div>
      <p>Restaurant: {restaurant.name}</p>
      <p>Date: {format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}</p>
      <p>Nombre de personnes: {reservation.nb_people}</p>
      <p>Statut: {reservation.status}</p>
      <Button onClick={cancelReservation}>Annuler</Button>
    </div>
  );
};

export default ReservationDetail;

