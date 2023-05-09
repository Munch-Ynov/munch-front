<script lang="ts" setup>
import type { Reservation } from "@/shared/interfaces/Reservation.interface";
import ReservationItem from "./ReservationItem.vue";
import type { PropType } from "vue";
defineProps({
  reservations: {
    type: Array as PropType<Reservation[]> | undefined,
    default: [],
  },
});
</script>

<template>
  <h3>Mes réservations récentes :</h3>
  <ReservationItem :reservations="reservations" />
</template>

<style lang="scss" scoped></style>
