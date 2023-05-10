<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <div>
    <h3 class="mb-4">Paramètres et Aide :</h3>
    <div class="flex flex-col gap-4">
      <div class="w-full flex justify-between">
        <a href="#">Conditions générales </a>
        <Icon icon="ic:round-chevron-right" height="20" />
      </div>
      <div class="w-full flex justify-between">
        <a href="#">Protections des données</a>
        <Icon icon="ic:round-chevron-right" height="20" />
      </div>
      <div class="w-full flex justify-between">
        <a href="#">Aide | Contacter le support</a>
        <Icon icon="ic:round-chevron-right" height="20" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
