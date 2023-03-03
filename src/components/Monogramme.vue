<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: "100px",
  },
});
</script>

<template>
  <div
    class="badge-logo rounded-full"
    :style="{ width: size, height: size }"
  ></div>
</template>

<style scoped lang="scss">
.badge-logo {
  background-image: url("../assets/images/monogramme.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
