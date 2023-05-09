<script lang="ts" setup>
import type { Reservation } from "@/shared/interfaces/Reservation.interface";
import type { PropType } from "vue";

import { useUser } from "@/shared/stores";
import { router } from "@/router";

const userStore = useUser();

let reservations: Reservation[];
if (!userStore.isAuthenticated) {
  router.push({ name: "Home" });
} else {
  fetch(`http://localhost:3000/reservations/user/1`).then((res) => {
    res.json().then((data) => {
      reservations = data;
    });
  });
}
</script>

<!-- reservations = { "id": 1, "userId": 1, "restaurantId": 24, "date": "2023-06-01T00:00:00.000Z", "nb_people": 4, "status": "ACCEPTED", "createdAt": "2023-05-08T23:04:31.301Z", "updatedAt": "2023-05-08T23:02:56.858Z" }
{ "id": 2, "userId": 1, "restaurantId": 22, "date": "2023-06-06T00:00:00.000Z", "nb_people": 3, "status": "ACCEPTED", "createdAt": "2023-05-08T23:05:52.272Z", "updatedAt": "2023-05-08T23:04:50.106Z" } -->

<template>
  <div>
    <div v-for="reservation in reservations">
      <div class="mt-3 flex">
        <div class="flex flex-col">
          <span class="first-letter:uppercase">
            {{
              new Date(reservation.date).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })
            }}.
          </span>
          <span>
            {{
              new Date(reservation.date)
                .toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(":", "h")
            }}
          </span>
        </div>
        <div class="p-3 bg-[var(--gray-1)] flex-1">
          <div class="flex justify-between">
            <span class="font-bold">{{ reservation.restaurant.name }}</span>
            <span class="font-bold">
              {{ reservation.nb_people }} personne
              {{ reservation.nb_people > 1 ? "s" : "" }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>{{ reservation.restaurant.address }}</span>
            <span class="font-bold">
              {{ reservation.restaurant.city }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
