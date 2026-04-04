<template>
  <div class="page-wrapper">
    <WhyUsSection />
    <PageExtraBlocks prefix="whyUsPage.extra" :blocks="extraBlocks" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import WhyUsSection from '@/components/sections/WhyUsSection.vue'
  import PageExtraBlocks from '@/components/sections/PageExtraBlocks.vue'
  import AOS from 'aos'

  const extraBlocks = [
    { key: 'block1', icon: 'bi bi-graph-up-arrow' },
    { key: 'block2', icon: 'bi bi-hand-thumbs-up' }
  ]

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper { padding-top: 5rem; }
</style>
