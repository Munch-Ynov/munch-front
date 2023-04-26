<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import { useRouter } from "vue-router";
import { useUser } from "./shared/stores";
const userStore = useUser();
const router = useRouter();

async function logout() {
  await userStore.logout();
  router.push("/connexion");
}
</script>

<template>
  <TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout" />
  <router-view class="flex-auto"></router-view>
</template>

<style lang="scss">
@import "./assets/main.scss";
</style>
