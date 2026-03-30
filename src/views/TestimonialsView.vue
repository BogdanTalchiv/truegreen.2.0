<template>
  <div class="page-wrapper">
    <TestimonialsSection />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
  import AOS from 'aos'

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper { padding-top: 5rem; }
</style>
