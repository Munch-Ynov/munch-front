<script setup lang="ts">
import { useUser } from "@/shared/stores";
import TopBar from "@/components/TopBar.vue";
import BannerProfile from "@/components/Profil/BannerProfile.vue";
import StatsProfile from "@/components/Profil/StatsProfile.vue";
import InfoProfile from "@/components/Profil/InfoProfile.vue";
import ReservationsProfile from "@/components/Profil/ReservationsProfile.vue";
import { useRouter } from "vue-router";
import ParameterProfile from "@/components/Profil/ParameterProfile.vue";
import LogoutProfile from "@/components/Profil/LogoutProfile.vue";
const userStore = useUser();

const router = useRouter();

if (!userStore.isAuthenticated) {
  router.push("/connexion");
}
</script>

<template>
  <BannerProfile :bannerImage="'banner-test.jpg'" />
  <div class="px-12">
    <StatsProfile
      :nb-reservations="userStore.currentUser?.reservations?.length || 0"
      :reservationsTitle="'réservations effectuées'"
      :reviewsTitle="'note données'"
    />
    <InfoProfile
      :email="userStore.currentUser?.email || 'lucas.steward@munch.com'"
      :phone="userStore.currentUser?.phone || '+262 692 00 00 00 '"
    />
    <div class="separator"></div>
    <ReservationsProfile :reservations="userStore.currentUser?.reservations" />
    <div class="separator"></div>
    <ParameterProfile />
    <div class="separator"></div>
    <LogoutProfile />
  </div>
</template>

<style scoped lang="scss">
.separator {
  border-bottom: 2px solid var(--gray-2);
  border-color: var(--gray-2);
  width: 75%;
  margin: 2.5rem auto;
}
</style>
