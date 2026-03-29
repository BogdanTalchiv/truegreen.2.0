<template>
  <div class="d-flex align-items-center justify-content-center" style="min-height: 100vh">
    <div class="text-center px-3">
      <div class="display-1 fw-bold text-success mb-3">404</div>
      <h1 class="mb-2">{{ title }}</h1>
      <p class="text-muted mb-4">{{ subtitle }}</p>
      <router-link to="/" class="btn btn-tg-primary">
        <i class="bi bi-house me-2"></i>{{ backLabel }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t, locale } = useI18n()

  const title = computed(() => {
    try { return t('notFound.title') } catch { return 'Page Not Found' }
  })
  const subtitle = computed(() => {
    try { return t('notFound.subtitle') } catch { return 'Sorry, the page you\'re looking for doesn\'t exist.' }
  })
  const backLabel = computed(() => {
    try { return t('notFound.backHome') } catch { return 'Back to Home' }
  })
</script>
