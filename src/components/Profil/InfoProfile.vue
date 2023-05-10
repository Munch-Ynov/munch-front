<script lang="ts" setup>
import { Icon } from "@iconify/vue";
defineProps({
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <h3>Mes informations personnelles :</h3>
    <div class="flex flex-col">
      <div class="flex gap-3 items-center p-3">
        <Icon
          icon="mdi-email-outline"
          color="var(--text-color)"
          :height="22"
          class="icon"
        />
        <a
          v-bind:href="'mailto:' + email"
          class="text-lg underline font-bold mt-1"
          >{{ email }}</a
        >
      </div>
      <div
        class="flex gap-3 items-center bg-[#FDECE3] rounded-xl p-3 text-[#FFAE84]"
      >
        <Icon
          icon="mdi-phone-outline"
          color="#FFAE84"
          :height="22"
          class="icon"
        />
        <span class="text-lg font-bold mt-1">{{ phone }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
