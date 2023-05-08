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
    <AvatarUser
      class="avatar"
      :profilImage="'monogramme.svg'"
      :size="'clamp(125px, 25vw, 200px)'"
    />
  </div>
  <div class="details">
    <h1 class="text-3xl">
      {{ userStore.currentUser?.firstName }} Lucas Steward
      {{ userStore.currentUser?.lastName }}
    </h1>
    <span class="text-md mt-1">
      {{ userStore.currentUser?.email }} Membre Confirmé
    </span>
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
  left: 4vw;
  border: 1vw solid var(--background);
}

.details {
  position: relative;
  margin-top: 1rem;
  left: clamp(150px, 30vw, 350px);
  width: fit-content;

  span {
    font-family: "Nexa";
  }
}
</style>
