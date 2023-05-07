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
</template>

<style scoped lang="scss"></style>
