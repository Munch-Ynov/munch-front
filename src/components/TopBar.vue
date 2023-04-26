<script setup lang="ts">
import Monogramme from "@/components/Monogramme.vue";
</script>

<template>
  <nav class="w-screen flex flex-row-reverse items-center px-3">
    <a href="/">
      <Monogramme size="50px" />
    </a>
  </nav>
</template>

<style scoped>
nav {
  height: clamp(50px, 5rem, 80px);
}
</style>
