<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps({
  nbReservations: {
    type: Number,
    default: 0,
  },
  reservationsTitle: {
    type: String,
    default: "réservations",
  },
  nbReviews: {
    type: Number,
    default: 0,
  },
  reviewsTitle: {
    type: String,
    default: "note attribuée",
  },
});
</script>

<template>
  <div class="statsProfile">
    <div>
      <Icon
        icon="mdi-silverware-fork-knife"
        color="var(--gray-3)"
        class="icon"
      />
      <span class="numberStat">{{ nbReservations }}</span>
      <span class="text-light">
        {{ reservationsTitle }}
      </span>
    </div>
    <div>
      <!-- Icon Annotation -->
      <Icon
        icon="heroicons-outline:annotation"
        color="var(--gray-3)"
        class="icon"
      />
      <span class="numberStat">{{ nbReviews }}</span>
      <span class="text-light">
        {{ reviewsTitle }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statsProfile {
  border: 1px solid var(--gray-2);
  display: flex;
  justify-content: space-around;
  padding: 0.75rem;
  margin: 2.5rem auto;

  div {
    display: grid;
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-auto-flow: column;
    height: fit-content;

    .icon {
      grid-row: span 2;
      height: 100%;
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    .numberStat {
      font-size: 1.2rem;
      line-height: 1;
      grid-column: span 2;
      margin-top: 3px;
    }

    .text-light {
      font-weight: lighter;
      grid-column: span 2;
      font-size: small;
    }
  }
}
</style>
