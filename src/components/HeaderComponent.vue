<script setup lang="ts">
import { ref } from "vue";
const showMenu = ref(false);
</script>

<template>
  <header class="w-full h-16 bg-indigo-600 drop-shadow-lg">
    <div
      class="container px-4 md:px-0 h-full mx-auto flex justify-between items-center"
    >
      <!-- Logo Here -->
      <a class="text-white text-xl font-bold italic" href="#">Munch</a>

      <!-- Menu links here -->
      <ul
        id="menu"
        class="fixed top-0 right-0 px-10 py-16 bg-indigo-600 z-50 md:relative md:flex md:p-0 md:bg-transparent md:flex-row md:space-x-6"
        :class="{ hidden: !showMenu }"
      >
        <li class="md:hidden z-90 fixed top-4 right-6">
          <a
            class="text-right text-white text-4xl"
            @click="showMenu = !showMenu"
            >&times;</a
          >
        </li>
        <li>
          <a
            class="text-white opacity-70 hover:opacity-100 duration-300"
            href="#"
            >Home</a
          >
        </li>
        <li>
          <a
            class="text-white opacity-70 hover:opacity-100 duration-300"
            href="#"
            >Something</a
          >
        </li>
        <li>
          <a
            class="text-white opacity-70 hover:opacity-100 duration-300"
            href="#"
            >Forums</a
          >
        </li>
        <li>
          <a
            class="text-white opacity-70 hover:opacity-100 duration-300"
            href="#"
            >About</a
          >
        </li>
        <li>
          <a
            class="text-white opacity-70 hover:opacity-100 duration-300"
            href="#"
            >Contact</a
          >
        </li>
      </ul>

      <!-- This is used to open the menu on mobile devices -->
      <div class="flex items-center md:hidden">
        <button
          class="text-white text-4xl font-bold opacity-70 hover:opacity-100 duration-300"
          @click="showMenu = !showMenu"
        >
          &#9776;
        </button>
      </div>
    </div>
  </header>
</template>
