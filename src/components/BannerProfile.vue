<script setup lang="ts">
import AvatarUser from "@/components/AvatarUser.vue";
import { useUser } from "@/shared/stores";
defineProps({
  bannerImage: {
    type: String,
    default: "",
  },
});
const userStore = useUser();
</script>

<template>
  <div
    class="banner h-40"
    :style="{ backgroundImage: `url(src/assets/images/${bannerImage})` }"
  >
    <AvatarUser class="avatar" :profilImage="'monogramme.svg'" :size="'20vw'" />
    <div class="details">
      <h1 class="text-3xl font-bold">
        {{ userStore.currentUser?.firstName }} John Doe
        {{ userStore.currentUser?.lastName }}
      </h1>
      <span class="text-lg mt-0">
        {{ userStore.currentUser?.email }} john@doe.com
      </span>
    </div>
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
  bottom: 0px;
  transform: translateY(50%);
  left: 8vw;
  border: 1vw solid var(--background);
}

.details {
  position: absolute;
  bottom: -80px;
  left: 35vw;
  color: var(--text-color);

  span {
    font-family: "Nexa";
  }
}
</style>
