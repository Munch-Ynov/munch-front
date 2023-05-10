<template>
  <div class="relative rounded overflow-hidden shadow-lg favorite_card">
    <img
      class="absolute inset-0 w-full h-full object-cover"
      src="https://images.unsplash.com/photo-1623073284788-0d846f75e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt=""
    />
    <div class="heart-container" @click="onHeartClick">
      <div class="heart-circle">
        <Icon
          :icon="isHearted ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"
          class="heart"
          height="24"
          width="24"
        />
      </div>
    </div>

    <div class="absolute inset-0 p-3 flex flex-col justify-end">
      <div class="font-bold text-black text-xl favorite_card_info">
        <div class="flex flex-col">
          <div class="flex justify-between">
            <span class="font-nexa font-bold text-lg">Long bao</span>
            <div class="flex items-center">
              <Icon
                icon="mdi:star"
                class="star"
                height="15"
                width="15"
                color="var(--primary-1)"
              />
              4.2
            </div>
          </div>
          <!-- <div class="favorite-icon">
            <Icon
              icon="mdi:food-turkey"
              class="map-marker"
              height="15"
              width="15"
              color="var(--primary-2)"
            />
          </div> -->
        </div>
        <div class="favorite_card_info_text_2">Rue Guissan</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const isHearted = ref(true);
const onHeartClick = () => {
  isHearted.value = !isHearted.value;
  console.log(isHearted.value);
  console.log("click");
};
</script>

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
h2 {
  font-size: 16px;
}
.favorite_card {
  height: 250px;
  width: 200px;
  border-radius: 20px;
}
.favorite_card_info {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
  border-radius: 10px;
  padding: 0.75rem;
  font-size: small;
}
.favorite-icon {
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: beige;
  margin-left: 10px;
  top: 50%;
  right: 10px;
}

.favorite-icon svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.favorite_card_info_text_2 {
  color: gray;
  font-size: 12px;
  font-weight: 300;
  line-height: 1;
}
.star {
  margin-left: 0.4em;
}
.heart-container {
  position: relative;
  top: 20px;
  right: 20px;
  color: #58ba97;
}
.heart {
  position: absolute;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.heart-circle {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 1;
}
</style>
