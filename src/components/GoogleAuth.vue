<script lang="ts" setup>
   import GoogleLogo from '../assets/google-icon.svg';
   import { getGoogleUrl } from '@/stores/getGoogleUrl';

    const from = '/';
</script>

<template>
    <div>
        <a :href="getGoogleUrl(from)" class="flex w-fit gap-6 py-2 px-4 bg-slate-300 rounded-md">
            <img :src="GoogleLogo" alt="Google Logo" class="h-6"/>
            Google

        </a>
    </div>
</template>