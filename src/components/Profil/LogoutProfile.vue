<script lang="ts" setup>
import { useUser } from "@/shared/stores";
import { useRouter } from "vue-router";
const userStore = useUser();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push("/connexion");
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full items-start">
    <button class="text-primary1" @click="handleLogout">Se déconnecter</button>
    <button class="text-primary1">Fermer le compte</button>
  </div>
</template>

<style lang="scss" scoped></style>
