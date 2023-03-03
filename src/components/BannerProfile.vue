<template>
  <div class="banner h-40">
    <AvatarUser :size="300px" :userImage="imageURL" />
  </div>
</template>

<script>
export default {
    name: "BannerProfile",
    props: {
        imageURL: {
            type: String,
            default: "",
        },
};
</script>

<style scoped lang="scss">
.banner {
  background-image: url("../assets/images/banner.jpg");
  background-size: cover;
  background-position: center;
}
</style>
