<script setup lang="ts">
import { ref } from "vue";
const showMenu = ref(false);

let restaurantAdress = "12 rue de la paix";
let restaurantName = "Le petit bistro";
</script>

<template>
    <div class="flex justify-center space-x-5 ">
        <div class=" flex flex-col  shrink-0  basis-1/4 rounded-2xl h-[20rem] test ">
            <div class="flex-1"></div>
            <div class="bg-white rounded-lg h-24 flex flex-col items-center relative backgroundTest justify-center">
                <span class="absolute -translate-y-[80%] -left-[1.5rem] h-14 w-14 rounded-[50%] bg-[#81C1A6] flex justify-center items-center shadowedBadge text-3xl font-semibold">1</span>
                <div class="text-2xl font-bold">{{ restaurantName }}</div>
                <div>{{ restaurantAdress }}</div>
            </div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">

.backgroundTest{
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
}

.test{
    background: url('../assets/toa-heftiba-inDRPMBfX8M-unsplash.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center ;
}
 .shadowedBadge1 {
    background: #81C1A6;
    box-shadow: 0px 2px 6px rgba(87, 186, 177, 0.44), inset 2px 2px 5px rgba(0, 0, 0, 0.21);
 }
  .shadowedBadge2 {
    background: #57BAB1;
    box-shadow: 0px 2px 6px rgba(87, 186, 177, 0.44), inset 2px 2px 5px rgba(0, 0, 0, 0.21);
 }
  .shadowedBadge3 {
    background: #43978E;
    box-shadow: 0px 2px 6px rgba(87, 186, 177, 0.44), inset 2px 2px 5px rgba(0, 0, 0, 0.21);
 }
</style>