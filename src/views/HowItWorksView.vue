<template>
  <div class="page-wrapper">
    <HowItWorksSection />
    <PageExtraBlocks prefix="howItWorksPage.extra" :blocks="extraBlocks" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
  import PageExtraBlocks from '@/components/sections/PageExtraBlocks.vue'
  import AOS from 'aos'

  const extraBlocks = [
    { key: 'block1', icon: 'bi bi-file-earmark-text' },
    { key: 'block2', icon: 'bi bi-clock-history' }
  ]

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper { padding-top: 5rem; }
</style>
