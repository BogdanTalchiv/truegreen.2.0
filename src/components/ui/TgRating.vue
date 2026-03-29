<template>
  <div class="tg-stars" :aria-label="`${score} out of 5 stars`">
    <i
      v-for="n in 5"
      :key="n"
      :class="n <= Math.round(score) ? 'bi bi-star-fill' : 'bi bi-star'"
    ></i>
  </div>
</template>

<script setup>
  defineProps({
    score: { type: Number, default: 5 }
  })
</script>
