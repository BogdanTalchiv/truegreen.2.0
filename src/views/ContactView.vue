<template>
  <div class="page-wrapper">
    <ContactQualityAssurance />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import ContactQualityAssurance from '@/components/sections/ContactQualityAssurance.vue'
  import AOS from 'aos'

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style scoped>
  .page-wrapper {
    padding-top: 5rem;
  }
</style>
