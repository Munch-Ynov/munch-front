<script setup lang="ts">

import BottomSavedCardComponent from './BottomSavedCardComponent.vue';
const array = [
{
    id : 1,
    name : "Le petit bistro",
    date : "12/12/2021",
    cookingStyle : "Europeen"
},{
    id : 2,
    name : "Le petit bistroooo",
    date : "12/12/2021",
    cookingStyle : "Europeen"
},{
    id : 3,
    name : "Le petit bistriiiii",
    date : "12/12/2021",
    cookingStyle : "Europeen"
}
]

</script>

<template>
    <div class="flex flex-col ">
        <div class="flex justify-between  font-bold text-3xl mb-5">
            <div>
                Récemment enregistrés:
            </div>
            <div class="font-light text-lg">
                Tout voir
            </div>
        </div>
        <div>
            <BottomSavedCardComponent class="mt-5" v-for="restaurant in array" :name="restaurant.name" :date="restaurant.date" :cookingStyle="restaurant.cookingStyle" :key="restaurant.id"></BottomSavedCardComponent>
            
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>