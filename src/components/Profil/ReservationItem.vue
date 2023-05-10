<script lang="ts" setup>
import type { Reservation } from "@/shared/interfaces/Reservation.interface";

import { useUser } from "@/shared/stores";
import { router } from "@/router";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const userStore = useUser();

const reservations = ref<Reservation[] | null>(null);

if (!userStore.isAuthenticated) {
  router.push({ name: "Home" });
} else {
  const userId = userStore.currentUser?.id;
  if (userId) {
    fetch(`http://localhost:3000/reservations/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        reservations.value = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>

<template>
  <div>
    <div v-if="reservations">
      <div v-if="reservations?.length == 0">
        <div class="flex mt-4 border-2 p-4 items-center">
          <span class="text-sm">Vous n'avez pas encore de réservation</span>
        </div>
      </div>
      <div v-else>
        <div v-for="reservation in reservations" :key="reservation.id">
          <div class="mt-3 flex items-center">
            <div class="flex flex-col w-28">
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
            <div class="p-3 bg-gray2 flex-1 rounded-2xl relative">
              <span
                class="font-bold text-xs py-1 px-1 bg-primary1 text-white rounded-lg absolute -top-0 -right-0"
              >
                {{ reservation.nb_people }} pers.
              </span>
              <span class="restau_cocogoose">{{
                reservation.restaurant.name
              }}</span>
              <div class="flex">
                <span>{{ reservation.restaurant.address }},</span>
                <span class="font-bold ml-1">
                  {{ reservation.restaurant.city }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex gap-4">
            <button class="btn-res text-primary1 border-2 border-primary1">
              Modifier
            </button>
            <button class="btn-res text-white bg-primary1">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!reservations">
      <div class="flex mt-4 border-2 p-4 items-center"></div>
      <Icon
        icon="eos-icons:three-dots-loading"
        width="100"
        color="var(--primary-1)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.restau_cocogoose {
  font-family: "Cocogoose";
}

.btn-res {
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  margin-top: 0.75rem;
  cursor: pointer;
}
</style>
