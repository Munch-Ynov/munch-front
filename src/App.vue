<script setup lang="ts">
import TheHeader from '@/components/HeaderComponent.vue';
import { useRouter } from 'vue-router';
import { useUser } from './shared/stores';
import NavbarComponent from '@/components/NavbarComponent.vue';
const userStore = useUser();
const router = useRouter();
userStore.fetchCurrentUser();

async function logout() {
    await userStore.logout();
    router.push('/connexion');
}
</script> 

<template>
    <div class='flex flex-col app-container mb-16'>
        <TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout" />
        <router-view class='flex-auto'></router-view>
        <NavbarComponent class=" fixed  bottom-0 left-0 right-0" />
    </div>
</template>


<style lang="scss" >
@import "./assets/main.scss";
.app-container {
    min-height: 100vh;
    background-color: white;
}
</style>