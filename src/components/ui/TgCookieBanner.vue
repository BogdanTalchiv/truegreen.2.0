<template>
  <Transition name="slide-up">
    <div v-if="uiStore.showCookieBanner" class="cookie-banner">
      <div class="container">
        <div class="d-flex flex-column flex-md-row align-items-center gap-3 py-3">
          <p class="mb-0 small flex-grow-1">
            <i class="bi bi-shield-check me-2"></i>
            {{ locale === 'es'
              ? 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Al continuar navegando, aceptas el uso de cookies.'
              : 'We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.'
            }}
          </p>
          <div class="d-flex gap-2 flex-shrink-0">
            <button class="btn btn-sm btn-outline-light" @click="uiStore.declineCookies">
              {{ locale === 'es' ? 'Solo necesarias' : 'Essential only' }}
            </button>
            <button class="btn btn-sm btn-light fw-semibold" @click="uiStore.acceptCookies">
              {{ locale === 'es' ? 'Aceptar todas' : 'Accept all' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import { useUiStore } from '@/stores/ui'
  import { useI18n } from 'vue-i18n'

  const uiStore = useUiStore()
  const { locale } = useI18n()
</script>

<style lang="scss" scoped>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: $tg-bg-dark;
    color: $tg-text-light;
    z-index: $zindex-cookie-banner;
    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
</style>
