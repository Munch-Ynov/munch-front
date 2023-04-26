<script setup lang="ts">
import { useUser } from "@/shared/stores";
import TopBar from "@/components/TopBar.vue";
import BannerProfile from "@/components/BannerProfile.vue";
const userStore = useUser();
const imageURL = "@/assets/images/banner-test.jpg";
</script>

<template>
  <TopBar />
  <BannerProfile :bannerImage="'banner-test.jpg'" />
  <!-- get firstname of current user -->
  <h1 class="title-name text-3xl font-bold text-center mt-10">
    {{ userStore.currentUser?.firstName }} John Doe
    {{ userStore.currentUser?.lastName }}
  </h1>
</template>

<style scoped lang="scss">
.title-name {
  font-family: var(--font-heading);
}
</style>
