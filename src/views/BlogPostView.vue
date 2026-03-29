<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <router-link :to="`/${locale}/blog`" class="btn btn-tg-ghost mb-4">
            <i class="bi bi-arrow-left me-1"></i>
            {{ locale === 'es' ? 'Volver al blog' : 'Back to blog' }}
          </router-link>

          <h1 class="mb-3">{{ locale === 'es' ? 'Artículo' : 'Article' }}: {{ $route.params.slug }}</h1>
          <p class="text-muted">
            {{ locale === 'es' ? 'El contenido del artículo estará disponible próximamente.' : 'Article content will be available soon.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
</script>
