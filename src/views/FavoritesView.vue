<script setup lang="ts">
import FavoriteCardComponent from "@/components/FavoriteCardComponent.vue";
</script>
<template>
  <div>
    <div class="favorite_title">
      <h1 class="text-2xl font-bold">Mes favoris :</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        class="ml-2"
      >
        <path
          fill="currentColor"
          d="M11 20q-.425 0-.713-.288T10 19v-6L4.2 5.6q-.375-.5-.113-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20h-2Zm1-7.7L16.95 6h-9.9L12 12.3Zm0 0Z"
        />
      </svg>
    </div>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded favorite_button"
    >
      Récemment enregistrées
    </button>
    <div class="flex flex-wrap mt-5 ml-5">
      <FavoriteCardComponent />
      <FavoriteCardComponent />
      <FavoriteCardComponent />
      <FavoriteCardComponent />
      <FavoriteCardComponent />
      <FavoriteCardComponent />

    </div>
  </div>
</template>

<style scoped lang="scss">
.favorite_title {
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  margin-left: 2em;
}
.favorite_button {
  border-radius: 20px;
  margin-left: 2em;
  margin-top: 2em;
  background: #81c1a6;
  font-size: small;
}
</style>
