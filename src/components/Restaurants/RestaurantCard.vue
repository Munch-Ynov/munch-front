<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { convertPrice } from "@/helper/convertPrice";
import type { RestaurantInterface } from "@/shared/interfaces";

defineProps<{
  restaurant: RestaurantInterface;
}>();
</script>

<template>
  <div class="flex relative h-24">
    <div
      class="flex flex-row items-center justify-between bg-white w-full h-full rounded-xl px-2 py-3 restaurant-information relative left-2"
    >
      <div class="flex flex-row items-center gap-2">
        <!-- <img class="w-10 h-10 rounded-full" :src="restaurant.images[0]" alt="restaurant image"> -->
        <div class="flex flex-col">
          <h3 class="text-xl">{{ restaurant.name }}</h3>
          <p class="text-xs text-gray-500 font-medium">
            {{ restaurant.address }}
          </p>
          <p class="text-xs text-gray-500 font-medium">type cuisine</p>
          <p class="text-xs text-gray-500 font-medium">
            {{ convertPrice(restaurant.price) }}
          </p>
        </div>
      </div>
      <div class="flex flex-col h-full items-center justify-between">
        <div class="text-sm font-semibold flex gap-1 items-center">
          <Icon icon="ic:round-star-border" /><span>7.3</span>
        </div>
        <Icon icon="material-symbols:favorite-outline" />
      </div>
    </div>
    <img
      class="h-full object-cover rounded-r-2xl w-1/2"
      src="../../assets/images/exempleresto.jpg"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.restaurant-information {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
}
</style>
