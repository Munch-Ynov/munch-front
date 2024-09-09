export enum ReservationStatusEnum {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  REFUSED = "REFUSED"
}

function toFrenchStatus(status: ReservationStatusEnum): string {
  switch (status) {
    case ReservationStatusEnum.PENDING:
      return "En attente";
    case ReservationStatusEnum.ACCEPTED:
      return "Confirmée";
    case ReservationStatusEnum.CANCELED:
      return "Annulée";
    case ReservationStatusEnum.REFUSED:
      return "Refusée";
  }
}
export default toFrenchStatus;
