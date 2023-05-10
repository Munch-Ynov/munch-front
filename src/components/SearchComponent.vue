
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
        <div v-if="vignettesTable.length" class="flex gap-4 pb-6">
            <div v-for="vignette in vignettesTable" :key="vignette.value" class="flex items-center gap-2 bg-[#81C1A6] rounded-2xl px-4 py-1 font-bold text-white">
                <span>{{ vignette.value }}</span>
                <button @click="removeVignette(vignette)" class="cursor-pointer"><Icon icon="mdi:close" /></button>
            </div>
        </div>
    </div>
</template>
    
    

<script setup lang="ts">
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { Icon } from '@iconify/vue';
import { z } from 'zod';
import { useRestaurant } from '@/shared/stores/useRestaurant';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const validationSchema = toFormValidator(z.object({
    search: z.string().min(3,"La recherche doit contenir au moins 3 caractères") 
}))

const {handleSubmit} = useForm({validationSchema});
const restaurantStore = useRestaurant();

const {value: searchValue, errorMessage} = useField("search")
const vignettesTable = reactive<{type: string, value:string}[]>([]);

const removeVignette = (vignette: {type: string, value:string}) => {
    const index = vignettesTable.indexOf(vignette);
    if(index > -1){
        vignettesTable.splice(index, 1)
        restaurantStore.filterSearch("")
        searchValue.value = ""
    }
}


const submit = handleSubmit( value => {
    if(router.currentRoute.value.path == "/"){
        router.replace("/search")
        
    }
    restaurantStore.filterSearch(value.search).then(() => {
        if(vignettesTable.length === 0){
            vignettesTable.push({type: "search", value: value.search})
        }else{
            const isSearchFilterPresent = vignettesTable.find(vignette => vignette.type === "search")
            if(isSearchFilterPresent){
                isSearchFilterPresent.value = value.search
            }else{
                vignettesTable.push({type: "search", value: value.search})
            }
        }
    })
})


</script>
      
    
<style scoped lang="scss">
    #searchBarWrapper{
        margin-bottom: 32px;
    }

    // .hasError{
    //     border: 1px solid red;
    // }
</style>
