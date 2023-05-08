<script setup lang="ts">
import type { RestaurantInterface } from '@/shared/interfaces';
import { useRestaurant } from '@/shared/stores/useRestaurant';
import { onMounted, reactive } from 'vue';
import RestaurantCard from './RestaurantCard.vue';
    
const restaurantStore = useRestaurant();
const state = reactive({
    restaurants: [] as RestaurantInterface[]
});

onMounted(async () => {
    restaurantStore.fetchRestaurants().then(() => {
        //getRestaurants = getter de pinia
        state.restaurants = restaurantStore.getRestaurants;
        // console.log(state.restaurants);  
    })      
})
</script>
<template> 
    <template v-if="state.restaurants.length">
        <div class="flex flex-col gap-3 px-7">
            <RestaurantCard v-for="restaurant in state.restaurants" :key="restaurant.id" :restaurant="restaurant" />
        </div>
    </template>
    <template v-else>
        <div class="flex flex-col items-center justify-center">
            pending ...
        </div>
    </template>
</template>
<style lang="scss" scoped></style>