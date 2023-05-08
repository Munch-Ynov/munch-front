
<template>
    <div>
        <h1 class="px-8 py-3 text-4xl">Restaurants</h1>
        <SearchComponent />
        <RestaurantListComponent/>
    </div>
</template>
    
    

<script setup lang="ts">
import RestaurantListComponent from '@/components/Restaurants/RestaurantListComponent.vue';
import SearchComponent from '@/components/SearchComponent.vue';

</script>
      
    
<style scoped lang="scss">

</style>
