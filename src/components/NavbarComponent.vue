<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <ul class="bg-white flex justify-around py-4 text-3xl">
    <li>
      <RouterLink to="/">
        <Icon icon="basil:home-outline" />
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/favoris">
        <Icon icon="mdi:cards-heart-outline" />
      </RouterLink>
    </li>
    <li>
      <Icon icon="mdi:map-marker-radius-outline" />
    </li>
    <li>
      <RouterLink to="/profil">
        <Icon icon="mdi:account-outline" />
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul li {
  cursor: pointer;
}

ul {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
