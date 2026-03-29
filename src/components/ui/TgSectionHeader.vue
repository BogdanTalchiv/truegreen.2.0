<template>
  <div class="text-center mb-5" data-aos="fade-up">
    <span v-if="tag" class="tg-badge tg-badge--primary mb-3 d-inline-block">
      {{ tag }}
    </span>
    <h2 class="section-title">
      {{ title }}
      <span v-if="highlight" class="text-gradient">{{ highlight }}</span>
    </h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
  defineProps({
    tag: { type: String, default: '' },
    title: { type: String, required: true },
    highlight: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  })
</script>
