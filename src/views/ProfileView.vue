<script setup lang="ts">
import { useUser } from "@/shared/stores";
import TopBar from "@/components/TopBar.vue";
import BannerProfile from "@/components/Profil/BannerProfile.vue";
import StatsProfile from "@/components/Profil/StatsProfile.vue";
import InfoProfile from "@/components/Profil/InfoProfile.vue";
import ReservationsProfile from "@/components/Profil/ReservationsProfile.vue";
const userStore = useUser();
const imageURL = "@/assets/images/banner-test.jpg";
</script>

<template>
  <TopBar />
  <BannerProfile :bannerImage="'banner-test.jpg'" />
  <div class="px-12">
    <StatsProfile
      :nb-reservations="userStore.currentUser?.reservations.length || 0"
      :reservationsTitle="'réservations effectuées'"
      :reviewsTitle="'note données'"
    />
    <InfoProfile
      :email="userStore.currentUser?.email || 'lucas.steward@munch.com'"
      :phone="userStore.currentUser?.phone || '+262 692 00 00 00 '"
    />
    <div class="border-b-2 my-8 w-3/4 mx-auto"></div>
    <ReservationsProfile />
  </div>
</template>

<style scoped lang="scss"></style>
