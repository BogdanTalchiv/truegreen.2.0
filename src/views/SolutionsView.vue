<template>
  <div class="page-wrapper">
    <SolutionsSection />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import SolutionsSection from '@/components/sections/SolutionsSection.vue'
  import AOS from 'aos'

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper { padding-top: 5rem; }
</style>
