<script>
defineProps({
  size: {
    type: String,
    default: "100px",
  },
  userImage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="avatar rounded-full" :style="{height:size, width:size}"></div>
</template>

<style scoped lang="scss">
.badge-logo {
  background-image: url("../assets/images/monogramme.svg");
  background-size: cover;
  background-position: center;
}
</style>
