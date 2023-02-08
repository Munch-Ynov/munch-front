<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import TopCardComponent from '@/components/TopCardComponent.vue';
import SelectionCardComponent from '@/components/SelectionCardComponent.vue';
import BottomSavedCardComponent from '@/components/BottomSavedCardComponent.vue';


</script>

<template>
    
  <main>
    <SelectionCardComponent></SelectionCardComponent>
    <NavbarComponent class=" fixed  bottom-0 left-0 right-0 " /> 
    <BottomSavedCardComponent></BottomSavedCardComponent>
  </main>
</template>

<style scoped lang="scss">
</style>
