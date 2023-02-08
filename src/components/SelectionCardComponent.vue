<script setup lang="ts">
import { ref } from "vue";
import TopCardComponent from "./TopCardComponent.vue";
const showMenu = ref(false);

let restaurantAdress = "12 rue de la paix";
let restaurantName = "Le petit bistro";

const array = [
    {
        id : 1,
        name : "Le petit bistro",
        adress : "12 rue de la paix"
    },{
        id : 2,
        name : "Le petit bistroooo",
        adress : "12 rue de la paix"
    },{
        id : 3,
        name : "Le petit bistriiiii",
        adress : "12 rue de la paix"
    }
]

</script>

<template>
    <div class="flex flex-col">
    <h1 class="font-bold text-3xl ml-44 mb-5">La sélection de la semaine</h1>
    <div class="flex justify-center space-x-8 ">
        <TopCardComponent v-for="restaurant in array" :name="restaurant.name" :adress="restaurant.adress" :key="restaurant.id"></TopCardComponent>
    </div>
</div>
</template>
