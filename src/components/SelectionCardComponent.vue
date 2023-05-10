<script setup lang="ts">
import { ref } from "vue";
import TopCardComponent from "./TopCardComponent.vue";
const showMenu = ref(false);

let restaurantAdress = "rue Alsace Lorraine";
let restaurantName = "Le petit bistro";

const array = [
  {
    id: 1,
    name: "La Cantine",
    adress: "rue Alsace Lorraine",
  },
  {
    id: 2,
    name: "L'entrecôte",
    adress: "rue Alsace Lorraine",
  },
  {
    id: 3,
    name: "Meet the meat",
    adress: "rue Alsace Lorraine",
  },
];
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-xl mb-5 font-coco">La sélection de la semaine</h1>
    <div class="flex space-x-8">
      <TopCardComponent
        v-for="restaurant in array"
        :name="restaurant.name"
        :adress="restaurant.adress"
        :key="restaurant.id"
      ></TopCardComponent>
    </div>
  </div>
</template>
