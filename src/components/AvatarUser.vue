<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: "100px",
  },
  profilImage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="avatar rounded-full"
    :style="{
      height: size,
      width: size,
      backgroundImage: `url(src/assets/images/${profilImage})`,
    }"
  ></div>
</template>

<style scoped lang="scss">
.avatar {
  background-size: cover;
  background-position: center;
}
</style>
