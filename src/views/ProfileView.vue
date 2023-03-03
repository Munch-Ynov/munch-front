<script setup lang="ts">
import { useUser } from "@/shared/stores";
import HeaderBar from "@/components/HeaderBar.vue";
const userStore = useUser();
</script>

<template>
  <HeaderBar />
</template>

<style scoped lang="scss"></style>
