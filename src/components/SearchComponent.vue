
<template>
    <div>
       <form @submit="submit">
            <div class="flex flex-col gap-1">
                <div id="searchBarWrapper" class="px-7 flex items-center relative h-10 gap-4">
                    <button class="rounded-lg absolute cursor-pointer mx-2 text-xl"><Icon icon="material-symbols:search-rounded" /></button>
                    <input v-model="searchValue" placeholder="Rechercher un restaurant, style culinaire, ..." id="search" type="text" class="bg-[#F4F4F4] pl-8 border-none w-full">
                    <button class="rounded-lg cursor-pointer text-xl bg-[#F4F4F4] relative flex items-center justify-center h-full px-4"><Icon class="absolute" icon="mdi:filter-outline" /></button>
                </div>
                <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
            </div>
        </form>
    </div>
</template>
    
    

<script setup lang="ts">
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { Icon } from '@iconify/vue';
import { z } from 'zod';

const validationSchema = toFormValidator(z.object({
    search: z.string().min(3,"Recherche composant") 
}))

const {handleSubmit} = useForm({validationSchema});

const {value: searchValue, errorMessage} = useField("search")

const submit = handleSubmit( value => {
    console.log(value);
    
})


</script>
      
    
<style scoped lang="scss">
    #searchBarWrapper{
        margin-bottom: 32px;
    }
</style>
