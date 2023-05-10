<script setup lang="ts">
import BottomSavedCardComponent from "./BottomSavedCardComponent.vue";
const array = [
  {
    id: 1,
    name: "La Cantine",
    date: "12/12/2021",
    cookingStyle: "Européen",
  },
  {
    id: 2,
    name: "Miam miaw",
    date: "12/12/2021",
    cookingStyle: "Européen",
  },
  {
    id: 3,
    name: "Meet the meat",
    date: "12/12/2021",
    cookingStyle: "Européen",
  },
];
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-baseline justify-between text-xl mt-8">
      <div class="font-coco">Récemment enregistrés:</div>
      <div class="font-light text-sm">Tout voir</div>
    </div>
    <div>
      <BottomSavedCardComponent
        class="mt-5"
        v-for="restaurant in array"
        :name="restaurant.name"
        :date="restaurant.date"
        :cookingStyle="restaurant.cookingStyle"
        :key="restaurant.id"
      ></BottomSavedCardComponent>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
