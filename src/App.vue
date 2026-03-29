<template>
  <router-view />
</template>

<script setup>
  import { useHead } from '@/composables/useHead'

  useHead({
    title: 'TrueGreen',
    description: 'Soluții de eficiență energetică și izolație termică — program oficial de finanțare 100%.'
  })
</script>
