<script setup lang="ts">
import TheHeader from '@/components/HeaderComponent.vue';
import { useRouter } from 'vue-router';
import { useUser } from './shared/stores';
const userStore = useUser();
const router = useRouter();

async function logout() {
    await userStore.logout();
    router.push('/connexion');
}
</script> 

<template>
    <div class='flex flex-col app-container'>
        <TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout" />
        <router-view class='flex-auto'></router-view>
    </div>
</template>


<style lang="scss" >
@import "./assets/main.scss";
.app-container {
    min-height: 100vh;
}
</style>