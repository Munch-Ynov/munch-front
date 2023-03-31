
<template>
    <h1>Home {{ test }}</h1>

</template>
    
    

<script setup lang="ts">
const test = import.meta.env.VITE_TEST_TITRE;
console.log(test);

</script>
      
    
<style scoped lang="scss">

</style>
