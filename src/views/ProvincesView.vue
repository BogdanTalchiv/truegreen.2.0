<template>
  <div class="page-wrapper">
    <ProvincesCoverageSection />
    <PageExtraBlocks
      prefix="provincesPage.extra"
      :blocks="extraBlocks"
    />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import ProvincesCoverageSection from '@/components/sections/ProvincesCoverageSection.vue'
  import PageExtraBlocks from '@/components/sections/PageExtraBlocks.vue'
  import AOS from 'aos'

  const extraBlocks = [
    { key: 'block1', icon: 'bi bi-truck' },
    { key: 'block2', icon: 'bi bi-diagram-3' }
  ]

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper {
    padding-top: 6rem;
    padding-bottom: 3rem;
  }
</style>
