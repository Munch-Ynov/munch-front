<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean | null;
}>();
const emit = defineEmits<{
  (e: "logout"): void;
}>();
</script>

<template>
  <nav class="header-container flex flex-row items-center px-20">
    <div class="flex-auto flex flex-row items-center">
      <router-link to="/">
        <span>Application</span>
      </router-link>
    </div>
    <ul class="flex flex-row items-center">
      <template v-if="isAuthenticated">
        <!-- <template> -->
        <li class="mr-5">
          <router-link to="/profil">Mon profil</router-link>
        </li>
        <li @click="emit('logout')">Déconnexion</li>
      </template>
      <template v-else-if="!isAuthenticated">
        <!-- <template> -->
        <li class="mr-5">
          <router-link to="/connexion">Connexion</router-link>
        </li>
        <li>
          <router-link to="/inscription">Inscription</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.header-container {
  background-color: var(--primary-1);
  a,
  li {
    color: white;
    cursor: pointer;
  }
}
</style>
