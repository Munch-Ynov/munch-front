<script setup lang="ts">
import { useUser } from '@/shared/stores';
const userStore = useUser()
</script> 

<template>
    <div class='flex flex-row items-center justify-center'>
        <div class="card">
            <pre>{{ userStore.currentUser }}</pre>
        </div>
    </div>
</template>


<style scoped lang="scss" >
.card {
    width: 100%;
    max-width: 300px;
}
</style>