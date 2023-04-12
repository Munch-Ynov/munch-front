<template>
  <div class="relative rounded overflow-hidden shadow-lg favorite_card">
    <img
      class="absolute inset-0 w-full h-full object-cover"
      src="https://cdn.pixabay.com/photo/2019/05/12/18/56/calf-4198760_1280.jpg"
      alt=""
    />
    <div class="heart-container" @click="onHeartClick">
      <div class="heart-circle" ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 256 256"
        class="heart"
      >
        <path
          fill="currentColor"
          d="M236 92c0 30.6-17.7 62-52.6 93.4a314.3 314.3 0 0 1-51.5 37.6a8.1 8.1 0 0 1-7.8 0C119.8 220.6 20 163.9 20 92a60 60 0 0 1 108-36a60 60 0 0 1 108 36Z"
        />
      </svg>
    </div>

    <div class="absolute inset-0 px-6 py-4 flex flex-col justify-end">
      <div class="font-bold text-black text-xl mb-2 favorite_card_info">
        <div class="flex items-center font">
          <h2>Pépite</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            class="star"
          >
            <path
              fill="#58BA97"
              d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
            />
          </svg>
          4.2
          <div class="favorite-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M30 10.5a8.5 8.5 0 0 0-16.862-1.534c-.777 2.366-1.467 3.695-1.86 4.342l-3.985 3.985A1 1 0 0 0 8 19h.108l-3.024 3.024a3.5 3.5 0 0 0-1.716 6.255c.135.104.257.225.361.36a3.5 3.5 0 0 0 6.248-1.736L13 23.878V24a1 1 0 0 0 1.707.707l3.986-3.986c.654-.395 1.992-1.087 4.372-1.865A8.502 8.502 0 0 0 30 10.5ZM10.937 19H13v2.05l-4.683 4.684A1.084 1.084 0 0 0 8 26.5a1.5 1.5 0 0 1-2.688.916a3.978 3.978 0 0 0-.727-.724A1.5 1.5 0 0 1 5.495 24c.283 0 .553-.112.753-.311L10.937 19Z"
              />
            </svg>
          </div>
        </div>
        <div class="favorite_card_info_text_2">Rue Guissan</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoriteCardComponent",
  data() {
    return {
      isHearted: false,
    };
  },
  methods: {
    onHeartClick() {
      this.isHearted = !this.isHearted;
      console.log(this.isHearted);
      console.log("click");
    },
  },
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
h2{
    font-size: 16px;
}
.favorite_card {
  height: 230px;
  width: 200px;
  border-radius: 23px;
  margin: 10px;
}
.favorite_card_info {
  background: rgba(255, 255, 255, 0.89);
  backdrop-filter: blur(3.5px);
  border-radius: 11px;
  padding: 0.3em;
  padding-left: 1em;
  padding-right: 1em;
  font-size: small;
}
.favorite-icon {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: beige;
  margin-left: 10px;
}

.favorite-icon svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.favorite_card_info_text_2 {
  color: gray;
}
.star {
  margin-left: 0.4em;
}
.heart-container {
  position: absolute;
  top: 5px;
  right: 10px;
  margin-top: 0.5em;
  margin-right: 0.5em;
  color: #58ba97;
}
.heart {
  z-index: 2;
  position: absolute;
  left: -30px;
  top: 5px;
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
