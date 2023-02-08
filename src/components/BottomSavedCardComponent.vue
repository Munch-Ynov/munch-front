<script setup lang="ts">

</script>

<template>
    <div class="bg-red-500 w-10/12 mx-auto flex">
        <div class="bg-blue-500 w-5/12">
            <h1 class="test rounded-2xl">   </h1>
        </div> 
        <div class="bg-green-500 w-7/12 p-5 ">
            <div class="flex justify-between">
                <div class="space-y-7">
                    <div>
                        <h1 class="font-bold text-2xl">Nom du restaurant</h1>
                        <h2>Type de cuisine restaurant</h2>
                    </div>
                    <div>
                        <span>Date d'ajout du restaurant</span>
                    </div>
                </div>
                <span>Image d'un truc</span>
            </div>
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

</style>