<template>
  <div class="page-wrapper">
    <SolutionsSection />
    <PageExtraBlocks prefix="solutionsPage.extra" :blocks="extraBlocks" />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import SolutionsSection from '@/components/sections/SolutionsSection.vue'
  import PageExtraBlocks from '@/components/sections/PageExtraBlocks.vue'
  import AOS from 'aos'

  const extraBlocks = [
    { key: 'block1', icon: 'bi bi-thermometer-half' },
    { key: 'block2', icon: 'bi bi-recycle' }
  ]

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper { padding-top: 5rem; }
</style>
