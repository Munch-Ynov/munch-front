<script setup lang="ts">
import { ref } from "vue";
import type MonogrammeVue from "./Monogramme.vue";
import { Icon } from "@iconify/vue";
const showMenu = ref(false);

const props = defineProps<{
  name: string;
  date: string;
  cookingStyle: string;
}>();
</script>

<template>
  <div class="flex justify-between">
    <div class="w-10/12 flex">
      <div class="w-5/12">
        <h1 class="test rounded-l-3xl"></h1>
      </div>
      <div class="p-5 box-shadow">
        <div class="flex justify-between">
          <div class="space-y-7">
            <div class>
              <h1 class="text-xl">{{ props.name }}</h1>
              <span class="text-xs"
                >Catégories cuisine : {{ props.cookingStyle }}</span
              >
            </div>
            <div>
              <span class="text-sm"
                >Ajouté aux favoris le : {{ props.date }}</span
              >
            </div>
          </div>
          <MonogrammeVue />
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <Icon
        icon="mdi:cards-heart"
        width="32"
        height="32"
        color="var(--primary-1)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  background: url("../assets/toa-heftiba-inDRPMBfX8M-unsplash.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.box-shadow {
  box-shadow: 4px 4px 14px #9a9fa5;
}
</style>
