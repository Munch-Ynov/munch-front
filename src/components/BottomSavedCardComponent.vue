<script setup lang="ts">

import { ref } from "vue";
const showMenu = ref(false);

const props = defineProps<{
    name: string
    date: string
    cookingStyle : string
}>()

</script>

<template>
    <div class="flex">
        <div class=" w-10/12 flex">
            <div class="w-5/12">
                <h1 class="test rounded-l-3xl">   </h1>
            </div> 
            <div class=" w-3/6 p-5 box-shadow ">
                <div class="flex justify-between">
                    <div class="space-y-7">
                        <div class>
                            <h1 class="font-bold text-2xl">{{ props.name }}</h1>
                            <h2>Catégories cuisine : {{props.cookingStyle}}</h2>
                        </div>
                        <div>
                            <span>Ajouté aux favoris le : {{props.date}}</span>
                        </div>
                    </div>
                    <span>Image d'un truc</span>
                </div>
            </div>
        </div>
        <div class=" flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" color="#81C1A6" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/></svg>
        </div>
    </div>
</template>

<style scoped lang="scss">

.test{
    background: url('../assets/toa-heftiba-inDRPMBfX8M-unsplash.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center ;
}

.box-shadow {
    box-shadow: 4px 4px 14px #9A9FA5;
}

</style>