<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="text-center mb-5">
        <h1 class="mb-3">{{ $t('nav.blog') }}</h1>
        <p class="lead text-muted">
          {{ locale === 'es'
            ? 'Artículos y recursos sobre eficiencia energética y aislamiento térmico.'
            : 'Articles and resources about energy efficiency and thermal insulation.'
          }}
        </p>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-md-8 text-center py-5">
          <i class="bi bi-journal-text display-1 text-muted opacity-25 mb-3 d-block"></i>
          <h3 class="text-muted">
            {{ locale === 'es' ? 'Próximamente...' : 'Coming soon...' }}
          </h3>
          <p class="text-muted">
            {{ locale === 'es'
              ? 'Estamos trabajando en nuevo contenido. ¡Vuelve pronto!'
              : 'We are working on new content. Come back soon!'
            }}
          </p>
          <router-link :to="`/${locale}`" class="btn btn-tg-primary">
            {{ $t('common.backToHome') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
</script>
