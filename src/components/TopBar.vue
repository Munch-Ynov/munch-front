<script setup lang="ts">
import Monogramme from "@/components/Monogramme.vue";
</script>

<template>
  <nav class="w-full flex flex-row-reverse items-center px-3">
    <RouterLink to="/">
      <Monogramme size="50px" />
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  height: clamp(50px, 5rem, 80px);
}
</style>
