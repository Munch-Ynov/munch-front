<script setup lang="ts">
import AvatarUser from "@/components/AvatarUser.vue";
defineProps({
  bannerImage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="banner h-40"
    :style="{ backgroundImage: `url(src/assets/images/${bannerImage})` }"
  >
    <AvatarUser class="avatar" :profilImage="'monogramme.svg'" />
  </div>
</template>

<style scoped lang="scss">
.banner {
  position: relative;
  background-size: cover;
  background-position: center;
}

.avatar {
  position: absolute;
  bottom: -40px;
  left: 5%;
  border: 4px solid var(--background);
}
</style>
