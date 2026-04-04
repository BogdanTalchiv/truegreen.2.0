<template>
  <div class="page-wrapper">
    <TestimonialsSection />
    <PageExtraBlocks prefix="testimonialsPage.extra" :blocks="extraBlocks" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
  import PageExtraBlocks from '@/components/sections/PageExtraBlocks.vue'
  import AOS from 'aos'

  const extraBlocks = [
    { key: 'block1', icon: 'bi bi-star' },
    { key: 'block2', icon: 'bi bi-people' }
  ]

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper { padding-top: 5rem; }
</style>
