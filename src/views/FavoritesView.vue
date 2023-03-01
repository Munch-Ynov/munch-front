<script setup lang="ts"></script>
<template>
  <div>
    <div class="favorite_title">
      <h1 class="text-2xl font-bold">Mes favoris :</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        class="ml-2"
      >
        <path
          fill="currentColor"
          d="M11 20q-.425 0-.713-.288T10 19v-6L4.2 5.6q-.375-.5-.113-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20h-2Zm1-7.7L16.95 6h-9.9L12 12.3Zm0 0Z"
        />
      </svg>
    </div>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded favorite_button"
    >
      Récemment enregistrées
    </button>
    <div class="grid grid-cols-4 gap-4 mt-5 ml-5">
      <div class="relative rounded overflow-hidden shadow-lg favorite_card ">
        <img
          class="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.pixabay.com/photo/2019/05/12/18/56/calf-4198760_1280.jpg"
          alt=""
        />
        <div class="heart-container">
          <div class="heart-circle"></div>
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
            </div>
            <div class="favorite_card_info_text_2">Rue Guissan</div>
          </div>
        </div>
      </div>
      <div class="relative rounded overflow-hidden shadow-lg favorite_card">
        <img
          class="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.pixabay.com/photo/2019/05/12/18/56/calf-4198760_1280.jpg"
          alt=""
        />
        <div class="heart-container">
          <div class="heart-circle"></div>
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
            </div>
            <div class="favorite_card_info_text_2">Rue Guissan</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
.favorite_card {
  height: 230px;
  width: 200px;
  border-radius: 23px;
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
